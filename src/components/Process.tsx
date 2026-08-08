"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import styles from "./Process.module.css";

export default function Process() {
  const { t } = useLanguage();

  return (
    <section id="proceso" className={styles.process}>
      <div className="container">
        <div className="sectionHeader">
          <span className="kicker">{t.process.kicker}</span>
          <h2 className="sectionTitle">{t.process.h2}</h2>
          <p className="sectionLead">{t.process.p}</p>
        </div>

        <ol className={styles.steps}>
          {t.process.steps.map((step, i) => (
            <li key={step.h} className={styles.step}>
              <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className={styles.stepTitle}>{step.h}</h3>
                <p className={styles.stepBody}>{step.p}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
