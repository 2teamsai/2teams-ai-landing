"use client";

import { useEffect, useState } from "react";
import Hero3D from "./Hero3D";
import Wordmark from "./Wordmark";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import styles from "./Hero.module.css";

export default function Hero() {
  const { t } = useLanguage();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.stage}>
        <Hero3D />

        <span className={`${styles.brainTag} ${styles.tagLeft} ${loaded ? styles.loaded : ""}`}>
          <span className={styles.dot} style={{ background: "var(--violet-2)" }} />
          {t.hero.tag1}
        </span>
        <span className={`${styles.brainTag} ${styles.tagRight} ${loaded ? styles.loaded : ""}`}>
          <span className={styles.dot} style={{ background: "var(--orange-2)" }} />
          {t.hero.tag2}
        </span>

        <div className={`${styles.logoBlock} ${loaded ? styles.loaded : ""}`}>
          <Wordmark as="div" size="heroCompact" />
        </div>
      </div>

      <p className={`${styles.eyebrow} ${loaded ? styles.loaded : ""}`}>{t.hero.eyebrow}</p>

      <div className={`${styles.messageBlock} ${loaded ? styles.loaded : ""}`}>
        <h1 className={styles.headline}>
          {t.hero.h1a}
          <br />
          {t.hero.h1b}
        </h1>
        <p className={styles.sub}>{t.hero.sub}</p>
        <a href="#problema" className={styles.enterCta}>
          {t.hero.ctaEnter}
        </a>
      </div>
    </section>
  );
}
