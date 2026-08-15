"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { successCases } from "@/data/successCasesData";
import SuccessCaseCard from "./SuccessCaseCard";
import styles from "./SuccessCases.module.css";

export default function SuccessCases() {
  const { t } = useLanguage();

  return (
    <section className={styles.successCases}>
      <div className="container">
        <div className="sectionHeader">
          <span className="kicker">{t.successCases.kicker}</span>
          <h2 className="sectionTitle">{t.successCases.h2}</h2>
          <p className="sectionLead">{t.successCases.p}</p>
        </div>

        <div className={styles.grid}>
          {successCases.map((item) => (
            <SuccessCaseCard key={item.id} item={item} resultsLabel={t.successCases.resultsLabel} />
          ))}
        </div>
      </div>
    </section>
  );
}
