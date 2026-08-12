import teamConfig from "../../data/team/team_cards_config.json";

export type TeamMember = {
  nombre: string;
  apellido: string;
  cargo: string;
  bio: string;
  email: string;
  telefono: string;
  whatsapp: string;
  linkedin: string;
  instagram: string;
  website: string;
  foto: string;
};

const SLUG_TO_KEY: Record<string, keyof typeof teamConfig> = {
  ezequiel: "ezequiel",
  mica: "micaela",
  patricio: "patricio",
  carolina: "carolina",
};

export const CARD_SLUGS = Object.keys(SLUG_TO_KEY);

export function getTeamMember(slug: string): TeamMember | null {
  const key = SLUG_TO_KEY[slug];
  if (!key) return null;
  return (teamConfig as Record<string, TeamMember>)[key] ?? null;
}

export function isPending(value: string | undefined | null): boolean {
  if (!value) return true;
  return value.includes("[") || value.trim().length === 0;
}

export function fullName(member: TeamMember): string {
  return isPending(member.apellido) ? member.nombre : `${member.nombre} ${member.apellido}`;
}
