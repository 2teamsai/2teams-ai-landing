"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import styles from "./Why.module.css";

export default function Why() {
  const { t } = useLanguage();

  return (
    <section id="por-que" className={styles.why}>
      <div className="container">
        <div className="sectionHeader">
          <span className="kicker">{t.why.kicker}</span>
          <h2 className="sectionTitle">{t.why.h2}</h2>
        </div>

        <div className={styles.grid}>
          {t.why.items.map((item) => (
            <div key={item.h} className={styles.card}>
              <h3 className={styles.cardTitle}>{item.h}</h3>
              <p className={styles.cardBody}>{item.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
