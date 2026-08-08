"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import styles from "./Origin.module.css";

export default function Origin() {
  const { t } = useLanguage();

  return (
    <section className={styles.origin}>
      <div className="container">
        <span className="kicker">{t.origin.kicker}</span>
        <h2 className="sectionTitle">{t.origin.h2}</h2>
        <p className={styles.body}>{t.origin.p}</p>
      </div>
    </section>
  );
}
