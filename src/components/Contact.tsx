"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import styles from "./Contact.module.css";

type FormStatus = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState({ nombre: "", email: "", empresa: "", mensaje: "" });
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("sent");
      setForm({ nombre: "", email: "", empresa: "", mensaje: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contacto" className={styles.contact}>
      <div className={`container ${styles.inner}`}>
        <span className="kicker">{t.contact.kicker}</span>
        <h2 className="sectionTitle">{t.contact.h2}</h2>
        <p className="sectionLead">{t.contact.p}</p>

        <div className={styles.actions}>
          <a href={`mailto:${t.contact.email}`} className={styles.cta}>
            {t.contact.cta}
          </a>
          <a href={`mailto:${t.contact.email}`} className={styles.email}>
            {t.contact.email}
          </a>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formRow}>
            <input
              type="text"
              placeholder={t.contact.formNamePlaceholder}
              required
              value={form.nombre}
              onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
            />
            <input
              type="email"
              placeholder={t.contact.formEmailPlaceholder}
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            />
          </div>
          <input
            type="text"
            placeholder={t.contact.formCompanyPlaceholder}
            value={form.empresa}
            onChange={(e) => setForm((f) => ({ ...f, empresa: e.target.value }))}
          />
          <textarea
            placeholder={t.contact.formMessagePlaceholder}
            rows={4}
            required
            value={form.mensaje}
            onChange={(e) => setForm((f) => ({ ...f, mensaje: e.target.value }))}
          />
          <button type="submit" className={styles.formSubmit} disabled={status === "sending"}>
            {status === "sending" ? t.contact.formSending : t.contact.formSubmit}
          </button>
          {status === "sent" && <p className={styles.formStatusOk}>{t.contact.formSuccess}</p>}
          {status === "error" && <p className={styles.formStatusError}>{t.contact.formError}</p>}
        </form>
      </div>
    </section>
  );
}
