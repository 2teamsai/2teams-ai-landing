"use client";

import Brand from "./Brand";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import styles from "./Footer.module.css";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <Brand size="footer" slogan={t.hero.slogan} />
        <span className={styles.locations}>{t.footer.locations}</span>
        <span className={styles.copyright}>© {year} 2Teams.AI</span>
      </div>
    </footer>
  );
}
