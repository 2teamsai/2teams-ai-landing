"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import styles from "./Problem.module.css";

export default function Problem() {
  const { t } = useLanguage();

  return (
    <section id="problema" className={styles.problem}>
      <div className={`container ${styles.inner}`}>
        <span className="kicker">{t.problem.kicker}</span>
        <h2 className="sectionTitle">{t.problem.h2}</h2>
        <p className={styles.body}>{t.problem.p}</p>
        <p className={styles.detail}>{t.problem.detail}</p>
      </div>
    </section>
  );
}
