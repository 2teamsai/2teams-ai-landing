"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import styles from "./Teams.module.css";

export default function Teams() {
  const { t } = useLanguage();

  return (
    <section id="equipos" className={styles.teams}>
      <div className="container">
        <div className="sectionHeader">
          <span className="kicker">{t.teams.kicker}</span>
          <h2 className="sectionTitle">{t.teams.h2}</h2>
          <p className="sectionLead">{t.teams.p}</p>
        </div>

        <div className={styles.grid}>
          <div className={`${styles.column} ${styles.ai}`}>
            <h3 className={styles.columnTitle}>{t.teams.ai.h3}</h3>
            <p className={styles.columnBody}>{t.teams.ai.p}</p>
            <ul className={styles.list}>
              {t.teams.ai.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={`${styles.column} ${styles.growth}`}>
            <h3 className={styles.columnTitle}>{t.teams.growth.h3}</h3>
            <p className={styles.columnBody}>{t.teams.growth.p}</p>
            <ul className={styles.list}>
              {t.teams.growth.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
