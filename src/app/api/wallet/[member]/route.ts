import { NextResponse } from "next/server";
import { getTeamMember } from "@/lib/team";
import { buildSaveToWalletUrl, getWalletConfig } from "@/lib/googleWallet";

export async function GET(_request: Request, { params }: { params: Promise<{ member: string }> }) {
  const { member: slug } = await params;
  const member = getTeamMember(slug);
  if (!member) {
    return new NextResponse("Tarjeta no encontrada.", { status: 404 });
  }

  const config = getWalletConfig();
  if (!config) {
    return new NextResponse(
      "Google Wallet todavía no está configurado para 2Teams.AI. Mientras tanto, usá 'Guardar contacto' para agregar los datos a tu teléfono.",
      { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } },
    );
  }

  try {
    const url = buildSaveToWalletUrl(member, slug, config);
    return NextResponse.redirect(url);
  } catch (err) {
    console.error("Error building Google Wallet link", err);
    return new NextResponse("No se pudo generar la tarjeta de Google Wallet.", { status: 500 });
  }
}
