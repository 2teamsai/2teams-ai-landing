import crypto from "crypto";
import { fullName, isPending, type TeamMember } from "./team";

const SITE_URL = "https://2teams-ai.com";
const CLASS_SUFFIX = "2teamsai_business_card";

export type WalletConfig = {
  issuerId: string;
  serviceAccountEmail: string;
  privateKey: string;
};

export function getWalletConfig(): WalletConfig | null {
  const issuerId = process.env.GOOGLE_WALLET_ISSUER_ID;
  const serviceAccountEmail = process.env.GOOGLE_WALLET_SERVICE_ACCOUNT_EMAIL;
  const rawPrivateKey = process.env.GOOGLE_WALLET_PRIVATE_KEY;
  if (!issuerId || !serviceAccountEmail || !rawPrivateKey) return null;
  // Env vars commonly store the key with literal "\n" sequences instead of real newlines.
  const privateKey = rawPrivateKey.replace(/\\n/g, "\n");
  return { issuerId, serviceAccountEmail, privateKey };
}

function base64url(input: Buffer | string): string {
  const buff = typeof input === "string" ? Buffer.from(input) : input;
  return buff.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function buildSaveToWalletUrl(member: TeamMember, slug: string, config: WalletConfig): string {
  const { issuerId, serviceAccountEmail, privateKey } = config;
  const classId = `${issuerId}.${CLASS_SUFFIX}`;
  const objectId = `${issuerId}.2teamsai_${slug}`;
  const name = fullName(member);

  const genericClass = { id: classId };

  const textModulesData: { id: string; header: string; body: string }[] = [
    { id: "role", header: "Rol", body: member.cargo },
  ];
  if (!isPending(member.bio)) textModulesData.push({ id: "bio", header: "Sobre mí", body: member.bio });

  const links: { uri: string; description: string }[] = [];
  if (!isPending(member.email)) links.push({ uri: `mailto:${member.email}`, description: "Email" });
  if (!isPending(member.website)) links.push({ uri: member.website, description: "Sitio web" });
  if (!isPending(member.linkedin)) links.push({ uri: member.linkedin, description: "LinkedIn" });
  if (!isPending(member.instagram)) links.push({ uri: member.instagram, description: "Instagram" });

  const genericObject = {
    id: objectId,
    classId,
    genericType: "GENERIC_TYPE_UNSPECIFIED",
    hexBackgroundColor: "#05060a",
    logo: { sourceUri: { uri: `${SITE_URL}/brand/logo-mark.png` } },
    cardTitle: { defaultValue: { language: "es", value: "2Teams.AI" } },
    header: { defaultValue: { language: "es", value: name } },
    subheader: { defaultValue: { language: "es", value: member.cargo } },
    textModulesData,
    ...(links.length ? { linksModuleData: { uris: links } } : {}),
  };

  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: serviceAccountEmail,
    aud: "google",
    typ: "savetowallet",
    iat: Math.floor(Date.now() / 1000),
    origins: [SITE_URL],
    payload: {
      genericClasses: [genericClass],
      genericObjects: [genericObject],
    },
  };

  const signingInput = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(payload))}`;
  const signature = crypto.createSign("RSA-SHA256").update(signingInput).sign(privateKey);
  const jwt = `${signingInput}.${base64url(signature)}`;

  return `https://pay.google.com/gp/v/save/${jwt}`;
}
