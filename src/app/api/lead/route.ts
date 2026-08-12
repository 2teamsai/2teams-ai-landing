import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LEAD_INBOX = "helloworld@2teams-ai.com";

export async function POST(request: Request) {
  let body: { nombre?: string; email?: string; mensaje?: string; memberName?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const nombre = body.nombre?.trim();
  const email = body.email?.trim();
  const mensaje = body.mensaje?.trim();
  const memberName = body.memberName?.trim() || "2Teams.AI";

  if (!nombre || !email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Nombre y email válidos son obligatorios" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY no está configurada");
    return NextResponse.json({ error: "Servicio de email no configurado" }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const fromAddress = process.env.RESEND_FROM_EMAIL || "2Teams.AI <onboarding@resend.dev>";

  try {
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: LEAD_INBOX,
      replyTo: email,
      subject: `Nuevo lead desde tarjeta de ${memberName}`,
      text: `Nombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje || "(sin mensaje)"}`,
    });

    if (error) {
      console.error("Resend error", error);
      return NextResponse.json({ error: "No se pudo enviar el email" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Error enviando email con Resend", err);
    return NextResponse.json({ error: "No se pudo enviar el email" }, { status: 502 });
  }
}
