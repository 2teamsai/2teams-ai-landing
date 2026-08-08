"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import styles from "./Audience.module.css";

export default function Audience() {
  const { t } = useLanguage();

  return (
    <section className={styles.audience}>
      <div className="container">
        <div className="sectionHeader">
          <span className="kicker">{t.audience.kicker}</span>
          <h2 className="sectionTitle">{t.audience.h2}</h2>
          <p className="sectionLead">{t.audience.p}</p>
        </div>

        <div className={styles.chips}>
          {t.audience.industries.map((industry) => (
            <span key={industry} className={styles.chip}>
              {industry}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
