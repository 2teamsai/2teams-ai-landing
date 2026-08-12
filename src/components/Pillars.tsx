"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import styles from "./Pillars.module.css";

export default function Pillars() {
  const { t } = useLanguage();

  return (
    <section className={styles.pillars}>
      <div className="container">
        <div className="sectionHeader">
          <span className="kicker">{t.pillars.kicker}</span>
          <h2 className="sectionTitle">{t.pillars.h2}</h2>
          <p className="sectionLead">{t.pillars.p}</p>
        </div>

        <div className={styles.grid}>
          {t.pillars.items.map((item, i) => (
            <div key={item.h} className={styles.card}>
              <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={styles.cardTitle}>{item.h}</h3>
              <p className={styles.cardBody}>{item.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
