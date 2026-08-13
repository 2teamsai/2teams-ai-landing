import type { Metadata } from "next";
import Flyer from "@/components/Flyer";

export const metadata: Metadata = {
  title: "2Teams.AI — Flyer (General)",
};

export default function FlyerGeneralPage() {
  return <Flyer variant="general" />;
}
