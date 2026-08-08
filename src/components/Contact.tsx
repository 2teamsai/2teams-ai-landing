"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import styles from "./Contact.module.css";

export default function Contact() {
  const { t } = useLanguage();

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
      </div>
    </section>
  );
}
