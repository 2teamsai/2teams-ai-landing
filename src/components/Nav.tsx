"use client";

import Brand from "./Brand";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import styles from "./Nav.module.css";

export default function Nav() {
  const { t, lang, toggleLang } = useLanguage();

  return (
    <header className={styles.nav}>
      <div className={`container ${styles.inner}`}>
        <a href="#top" aria-label="2Teams.AI">
          <Brand size="nav" slogan={t.hero.slogan} />
        </a>

        <nav className={styles.links}>
          <a href="#equipos">{t.nav.teams}</a>
          <a href="#proceso">{t.nav.process}</a>
          <a href="#por-que">{t.nav.why}</a>
          <a href="#contacto">{t.nav.contact}</a>
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.langToggle}
            onClick={toggleLang}
            aria-label="Switch language"
          >
            <span className={lang === "es" ? styles.active : undefined}>ES</span>
            <span aria-hidden="true">/</span>
            <span className={lang === "en" ? styles.active : undefined}>EN</span>
          </button>
          <a href="#contacto" className={styles.cta}>
            {t.nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
}
