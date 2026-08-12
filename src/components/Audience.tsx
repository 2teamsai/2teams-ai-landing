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

        <div className={styles.grid}>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>{t.audience.businessLabel}</h3>
            <p className={styles.columnLead}>{t.audience.businessLead}</p>
            <div className={styles.chips}>
              {t.audience.industries.map((industry) => (
                <span key={industry} className={styles.chip}>
                  {industry}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.column}>
            <h3 className={styles.columnTitle}>{t.audience.peopleLabel}</h3>
            <p className={styles.columnLead}>{t.audience.peopleLead}</p>
            <div className={styles.chips}>
              {t.audience.peopleTopics.map((topic) => (
                <span key={topic} className={styles.chip}>
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
