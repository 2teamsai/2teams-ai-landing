"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Hero3D from "./Hero3D";
import Wordmark from "./Wordmark";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import styles from "./Splash.module.css";

export default function Splash() {
  const { t } = useLanguage();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={styles.splash}>
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
          <p className={styles.slogan}>{t.hero.slogan}</p>
        </div>
      </div>

      <p className={`${styles.eyebrow} ${loaded ? styles.loaded : ""}`}>{t.hero.eyebrow}</p>

      <Link href="/landing" className={`${styles.enterCta} ${loaded ? styles.loaded : ""}`}>
        {t.hero.ctaEnter}
      </Link>
    </section>
  );
}
