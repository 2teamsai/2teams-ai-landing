import type { SuccessCase } from "@/data/successCasesData";
import styles from "./SuccessCaseCard.module.css";

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default function SuccessCaseCard({ item, resultsLabel }: { item: SuccessCase; resultsLabel: string }) {
  const initials = item.company
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className={`${styles.card} ${styles[item.accent]}`}>
      <div className={styles.header}>
        <div className={styles.logoPlaceholder}>{initials}</div>
        <div>
          <p className={styles.company}>{item.company}</p>
          <p className={styles.industry}>{item.industry}</p>
        </div>
      </div>

      <p className={styles.testimonial}>&ldquo;{item.testimonial}&rdquo;</p>

      <p className={styles.resultsLabel}>{resultsLabel}</p>
      <ul className={styles.results}>
        {item.results.map((r) => (
          <li key={r}>
            <span className={styles.checkDot}>
              <CheckIcon />
            </span>
            {r}
          </li>
        ))}
      </ul>

      <p className={styles.attribution}>
        — {item.contactName}, {item.contactRole}
        <br />@ {item.company}
      </p>
    </div>
  );
}
