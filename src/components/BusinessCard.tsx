"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Wordmark from "./Wordmark";
import BusinessCardPrint from "./BusinessCardPrint";
import { downloadQrCode } from "./QRCodeDownload";
import { fullName, isPending, type TeamMember } from "@/lib/team";
import styles from "./BusinessCard.module.css";

const WHATSAPP_MESSAGE = "Hola, te escribo desde tu tarjeta de 2Teams.AI";

function buildVCard(member: TeamMember): string {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${isPending(member.apellido) ? "" : member.apellido};${member.nombre};;;`,
    `FN:${fullName(member)}`,
    "ORG:2Teams.AI",
    `TITLE:${member.cargo}`,
  ];
  if (!isPending(member.telefono)) lines.push(`TEL;TYPE=CELL:${member.telefono.replace(/\s+/g, "")}`);
  if (!isPending(member.email)) lines.push(`EMAIL;TYPE=INTERNET:${member.email}`);
  if (!isPending(member.website)) lines.push(`URL:${member.website}`);
  if (!isPending(member.linkedin)) lines.push(`URL:${member.linkedin}`);
  if (!isPending(member.instagram)) lines.push(`URL:${member.instagram}`);
  lines.push("NOTE:Conectemos en 2Teams.AI");
  lines.push("END:VCARD");
  return lines.join("\r\n");
}

function downloadVCard(member: TeamMember) {
  const vcard = buildVCard(member);
  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${member.nombre}-2TeamsAI.vcf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

type FormStatus = "idle" | "sending" | "sent" | "error";

export default function BusinessCard({ member, slug }: { member: TeamMember; slug: string }) {
  const [formOpen, setFormOpen] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [imageStatus, setImageStatus] = useState<"idle" | "capturing">("idle");
  const [qrStatus, setQrStatus] = useState<"idle" | "generating">("idle");
  const printRef = useRef<HTMLDivElement>(null);

  const name = fullName(member);
  const telHref = !isPending(member.telefono) ? `tel:${member.telefono.replace(/\s+/g, "")}` : null;
  const waDigits = !isPending(member.whatsapp) ? member.whatsapp.replace(/\D/g, "") : null;
  const waHref = waDigits ? `https://wa.me/${waDigits}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}` : null;
  const emailHref = !isPending(member.email) ? `mailto:${member.email}` : null;
  const websiteHref = !isPending(member.website) ? member.website : null;
  const linkedinHref = !isPending(member.linkedin) ? member.linkedin : null;
  const instagramHref = !isPending(member.instagram) ? member.instagram : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, memberName: name, memberSlug: slug }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("sent");
      setForm({ nombre: "", email: "", mensaje: "" });
    } catch {
      setStatus("error");
    }
  }

  async function handleDownloadImage() {
    if (!printRef.current || imageStatus === "capturing") return;
    setImageStatus("capturing");
    try {
      const { default: html2canvas } = await import("html2canvas");
      const canvas = await html2canvas(printRef.current, {
        backgroundColor: "#fafafa",
        scale: 2,
        useCORS: true,
        width: 1000,
        height: 500,
      });
      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      const lastName = !isPending(member.apellido) ? `-${member.apellido}` : "";
      a.download = `2Teams-${member.nombre}${lastName}.png`;
      a.click();
    } finally {
      setImageStatus("idle");
    }
  }

  async function handleDownloadQr() {
    if (qrStatus === "generating") return;
    setQrStatus("generating");
    try {
      await downloadQrCode(slug);
    } finally {
      setQrStatus("idle");
    }
  }

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <div className={styles.captureArea}>
          <div className={styles.logoBlock}>
            <Image
              src="/brand/logo-mark.png"
              alt=""
              width={52}
              height={46}
              className={styles.logoMark}
              priority
            />
            <Wordmark as="div" size="nav" />
            <p className={styles.slogan}>Soluciones Inteligentes</p>
          </div>

          <div className={styles.avatarWrap}>
            <Image src={member.foto} alt={name} width={112} height={112} className={styles.avatar} priority />
          </div>

          <h1 className={styles.name}>{name}</h1>
          <p className={styles.role}>{member.cargo}</p>
          {!isPending(member.bio) && <p className={styles.bio}>{member.bio}</p>}
        </div>

        <div className={styles.actions}>
          {telHref && (
            <a className={styles.actionBtn} href={telHref}>
              <PhoneIcon /> Llamar
            </a>
          )}
          {waHref && (
            <a className={styles.actionBtn} href={waHref} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> WhatsApp
            </a>
          )}
          {emailHref && (
            <a className={styles.actionBtn} href={emailHref}>
              <MailIcon /> Email
            </a>
          )}
          {websiteHref && (
            <a className={styles.actionBtn} href={websiteHref} target="_blank" rel="noopener noreferrer">
              <GlobeIcon /> Website
            </a>
          )}
          {linkedinHref && (
            <a className={styles.actionBtn} href={linkedinHref} target="_blank" rel="noopener noreferrer">
              <LinkedInIcon /> LinkedIn
            </a>
          )}
          {instagramHref && (
            <a className={styles.actionBtn} href={instagramHref} target="_blank" rel="noopener noreferrer">
              <InstagramIcon /> Instagram
            </a>
          )}
        </div>

        <button type="button" className={styles.saveBtn} onClick={() => downloadVCard(member)}>
          <DownloadIcon /> Guardar contacto
        </button>

        <div className={styles.secondaryRow}>
          <a className={styles.secondaryBtn} href={`/api/wallet/${slug}`} target="_blank" rel="noopener noreferrer">
            <WalletIcon /> Google Wallet
          </a>
          <button
            type="button"
            className={styles.secondaryBtn}
            onClick={handleDownloadImage}
            disabled={imageStatus === "capturing"}
          >
            <ImageIcon /> {imageStatus === "capturing" ? "Generando..." : "Descargar imagen"}
          </button>
          <button
            type="button"
            className={`${styles.secondaryBtn} ${styles.secondaryBtnWide}`}
            onClick={handleDownloadQr}
            disabled={qrStatus === "generating"}
          >
            <QrIcon /> {qrStatus === "generating" ? "Generando..." : "Descargar QR"}
          </button>
        </div>

        <div className={styles.leadBlock}>
          <button
            type="button"
            className={styles.leadToggle}
            onClick={() => setFormOpen((v) => !v)}
            aria-expanded={formOpen}
          >
            {formOpen ? "Cerrar" : "Dejame tu contacto"}
          </button>

          {formOpen && (
            <form className={styles.leadForm} onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Tu nombre"
                required
                value={form.nombre}
                onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
              />
              <input
                type="email"
                placeholder="Tu email"
                required
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
              <textarea
                placeholder="Mensaje (opcional)"
                rows={3}
                value={form.mensaje}
                onChange={(e) => setForm((f) => ({ ...f, mensaje: e.target.value }))}
              />
              <button type="submit" className={styles.leadSubmit} disabled={status === "sending"}>
                {status === "sending" ? "Enviando..." : "Enviar"}
              </button>
              {status === "sent" && <p className={styles.leadStatusOk}>¡Gracias! Te vamos a contactar pronto.</p>}
              {status === "error" && (
                <p className={styles.leadStatusError}>
                  No se pudo enviar. Escribinos directo a helloworld@2teams-ai.com
                </p>
              )}
            </form>
          )}
        </div>
      </div>

      <BusinessCardPrint ref={printRef} member={member} />
    </main>
  );
}

export function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.6 6.32A8.86 8.86 0 0 0 12.05 4a8.94 8.94 0 0 0-7.74 13.4L3 21l3.7-1.28a8.9 8.9 0 0 0 4.35 1.12h.02a8.94 8.94 0 0 0 8.93-8.93 8.9 8.9 0 0 0-2.4-5.59zm-5.55 13.7a7.4 7.4 0 0 1-3.78-1.04l-.27-.16-2.24.78.74-2.18-.18-.28a7.45 7.45 0 1 1 13.83-3.9 7.45 7.45 0 0 1-8.1 6.78zm4.08-5.58c-.22-.11-1.32-.65-1.53-.73-.2-.08-.36-.11-.51.11-.15.22-.58.73-.71.88-.13.15-.26.16-.48.05a6.1 6.1 0 0 1-1.8-1.11 6.75 6.75 0 0 1-1.24-1.55c-.13-.22-.01-.34.1-.45.1-.1.22-.26.34-.4.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.4-.07-.11-.51-1.23-.7-1.68-.18-.44-.37-.38-.51-.39h-.44a.85.85 0 0 0-.61.29 2.6 2.6 0 0 0-.81 1.93c0 1.14.83 2.24.94 2.39.11.15 1.63 2.49 3.96 3.49.55.24.98.38 1.32.48.55.18 1.06.15 1.46.09.45-.07 1.32-.54 1.5-1.06.19-.52.19-.96.13-1.05-.06-.1-.2-.15-.42-.26z" />
    </svg>
  );
}

export function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}

export function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5.001 2.5 2.5 0 0 1 0-5.001zM3 8.98h4v12.02H3zm7 0h3.84v1.64h.05c.53-1 1.85-2.06 3.8-2.06 4.07 0 4.82 2.68 4.82 6.16v6.28h-4v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67h-4z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="6" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
      <circle cx="17" cy="15" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ImageIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" stroke="none" />
      <path d="m21 15-5-5L5 21" />
    </svg>
  );
}

function QrIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3h-3z" />
      <path d="M20 14h1v1h-1z" fill="currentColor" stroke="none" />
      <path d="M14 20h1v1h-1z" fill="currentColor" stroke="none" />
      <path d="M20 20h1v1h-1z" fill="currentColor" stroke="none" />
    </svg>
  );
}
