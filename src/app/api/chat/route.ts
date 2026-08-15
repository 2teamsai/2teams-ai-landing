import { NextResponse } from "next/server";
import { Resend } from "resend";
import type { Lang } from "@/lib/i18n/dictionary";
import { getLeadToolDeclaration, getSystemPrompt, LEAD_TOOL_NAME } from "@/lib/chatSystemPrompt";

const LEAD_INBOX = "helloworld@2teams-ai.com";
// gemini-flash-latest currently resolves to a brand-new model capped at a 20 req/day free
// quota — unusable for a live chatbot. gemini-flash-lite-latest has a much higher free
// quota and still supports function calling, so it's the primary model here.
const MODEL = "gemini-flash-lite-latest";

type ChatMessage = { role: "user" | "model"; text: string };

type GeminiPart = {
  text?: string;
  functionCall?: { name: string; args: Record<string, unknown> };
  functionResponse?: { name: string; response: Record<string, unknown> };
};
type GeminiContent = { role: string; parts: GeminiPart[] };

function buildContents(history: ChatMessage[]): GeminiContent[] {
  return history.map((m) => ({ role: m.role, parts: [{ text: m.text }] }));
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function callGemini(contents: GeminiContent[], systemPrompt: string, apiKey: string) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;
  const payload = JSON.stringify({
    systemInstruction: { parts: [{ text: systemPrompt }] },
    contents,
    tools: [{ functionDeclarations: [getLeadToolDeclaration()] }],
    generationConfig: { maxOutputTokens: 1024, temperature: 0.7 },
  });

  const maxAttempts = 3;
  let lastError = "";
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
    });

    if (res.ok) return res.json();

    lastError = await res.text();
    const retryable = res.status === 503;
    if (!retryable || attempt === maxAttempts) {
      throw new Error(`Gemini API error ${res.status}: ${lastError}`);
    }
    await sleep(500 * attempt);
  }

  throw new Error(`Gemini API error: ${lastError}`);
}

async function sendLeadEmail(args: Record<string, unknown>, history: ChatMessage[]) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY no está configurada — no se pudo enviar el lead del chatbot");
    return;
  }

  const name = typeof args.name === "string" ? args.name : "(sin nombre)";
  const sector = typeof args.sector === "string" ? args.sector : "";

  const transcript = history.map((m) => `${m.role === "user" ? "Usuario" : "Bot"}: ${m.text}`).join("\n");

  const fields = Object.entries(args)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  const resend = new Resend(apiKey);
  const fromAddress = process.env.RESEND_FROM_EMAIL || "2Teams.AI <onboarding@resend.dev>";

  try {
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: LEAD_INBOX,
      subject: `Nuevo lead desde Teambot: ${name}${sector ? ` - ${sector}` : ""}`,
      text: `Datos del lead:\n${fields}\n\n--- Conversación completa ---\n${transcript}`,
    });
    if (error) console.error("Resend error (chatbot lead)", error);
  } catch (err) {
    console.error("Error enviando lead del chatbot", err);
  }
}

export async function POST(request: Request) {
  let body: { history?: ChatMessage[]; lang?: Lang };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const history = body.history;
  const lang: Lang = body.lang === "en" ? "en" : "es";

  if (!Array.isArray(history) || history.length === 0) {
    return NextResponse.json({ error: "Falta el historial de la conversación" }, { status: 400 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY no está configurada");
    return NextResponse.json({ error: "Chat no configurado" }, { status: 500 });
  }

  const systemPrompt = getSystemPrompt(lang);
  const contents = buildContents(history);

  try {
    const first = await callGemini(contents, systemPrompt, apiKey);
    const parts: GeminiPart[] = first.candidates?.[0]?.content?.parts ?? [];
    const functionCallPart = parts.find((p) => p.functionCall?.name === LEAD_TOOL_NAME);

    if (functionCallPart?.functionCall) {
      const args = functionCallPart.functionCall.args ?? {};
      await sendLeadEmail(args, history);

      const followUpContents: GeminiContent[] = [
        ...contents,
        { role: "model", parts },
        {
          role: "user",
          parts: [{ functionResponse: { name: LEAD_TOOL_NAME, response: { result: "saved" } } }],
        },
      ];

      const second = await callGemini(followUpContents, systemPrompt, apiKey);
      const finalText = second.candidates?.[0]?.content?.parts?.find((p: GeminiPart) => p.text)?.text;
      return NextResponse.json({ reply: finalText || "¡Gracias! Ya guardé tu información.", leadCaptured: true });
    }

    const text = parts.find((p) => p.text)?.text;
    return NextResponse.json({ reply: text || "...", leadCaptured: false });
  } catch (err) {
    console.error("Error llamando a Gemini", err);
    return NextResponse.json({ error: "No se pudo generar una respuesta" }, { status: 502 });
  }
}
