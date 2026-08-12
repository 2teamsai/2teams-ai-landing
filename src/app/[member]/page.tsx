import { notFound } from "next/navigation";
import { CARD_SLUGS, fullName, getTeamMember } from "@/lib/team";
import BusinessCard from "@/components/BusinessCard";

export function generateStaticParams() {
  return CARD_SLUGS.map((member) => ({ member }));
}

export async function generateMetadata({ params }: { params: Promise<{ member: string }> }) {
  const { member: slug } = await params;
  const member = getTeamMember(slug);
  if (!member) return {};
  return { title: `${fullName(member)} — 2Teams.AI` };
}

export default async function MemberCardPage({ params }: { params: Promise<{ member: string }> }) {
  const { member: slug } = await params;
  const member = getTeamMember(slug);
  if (!member) notFound();

  return <BusinessCard member={member} slug={slug} />;
}
