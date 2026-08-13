import type { Metadata } from "next";
import Flyer from "@/components/Flyer";

export const metadata: Metadata = {
  title: "2Teams.AI — Flyer (Empresas)",
};

export default function FlyerEmpresasPage() {
  return <Flyer variant="empresas" />;
}
