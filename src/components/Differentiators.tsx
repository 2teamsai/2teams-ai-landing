"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import styles from "./Differentiators.module.css";

export default function Differentiators() {
  const { t } = useLanguage();

  return (
    <section className={styles.differentiators}>
      <div className={`container ${styles.inner}`}>
        <span className="kicker">{t.differentiators.kicker}</span>
        <p className={styles.statement}>{t.differentiators.statement}</p>

        <div className={styles.points}>
          {t.differentiators.points.map((point) => (
            <div key={point} className={styles.point}>
              <span className={styles.mark} aria-hidden="true" />
              {point}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
