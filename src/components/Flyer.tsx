import Image from "next/image";
import QRCode from "qrcode";
import styles from "./Flyer.module.css";

type Variant = "general" | "empresas";

const QR_TARGET = "https://2teams-ai.com/landing";

const COPY: Record<
  Variant,
  {
    headline: string;
    columns: { title: string; accent: "blue" | "violet"; items: string[] }[];
  }
> = {
  general: {
    headline: "No vendemos IA. Vendemos resultados.",
    columns: [
      {
        title: "Para empresas",
        accent: "blue",
        items: [
          "Automatización inteligente",
          "Sistemas que trabajan 24/7",
          "Escalabilidad sin más personal",
          "Ahorros reales en costos",
        ],
      },
      {
        title: "Para personas",
        accent: "violet",
        items: [
          "Aprendé a usar IA",
          "Organizá tu vida con IA",
          "Productividad automática",
          "Sin complicaciones técnicas",
        ],
      },
    ],
  },
  empresas: {
    headline: "Automatiza tu negocio. Crece sin contratar.",
    columns: [
      {
        title: "Para empresas",
        accent: "blue",
        items: [
          "Automatización inteligente",
          "Sistemas que trabajan 24/7",
          "Escalabilidad sin más personal",
          "Ahorros reales en costos",
          "Menos errores humanos",
          "Resultados medibles desde el día 1",
        ],
      },
    ],
  },
};

async function buildQrSvg(): Promise<string> {
  return QRCode.toString(QR_TARGET, {
    type: "svg",
    margin: 0,
    color: { dark: "#12121a", light: "#00000000" },
  });
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export default async function Flyer({ variant }: { variant: Variant }) {
  const copy = COPY[variant];
  const qrSvg = await buildQrSvg();

  return (
    <div className={styles.flyer}>
      {/* HEADER */}
      <div className={styles.header}>
        <Image src="/brand-guidelines/logo-color.png" alt="" width={56} height={56} className={styles.logo} />
        <div className={styles.wordmark}>
          <span className={styles.wmBlue}>2T</span>
          <span className={styles.wmViolet}>eams</span>
          <span className={styles.wmOrange}>.AI</span>
        </div>
        <p className={styles.slogan}>Soluciones Inteligentes</p>
      </div>

      {/* HEADLINE */}
      <div className={styles.headlineBlock}>
        <h1 className={styles.headline}>{copy.headline}</h1>
      </div>

      {/* SERVICIOS */}
      <div className={`${styles.services} ${copy.columns.length === 1 ? styles.servicesSingle : ""}`}>
        {copy.columns.map((col) => (
          <div key={col.title} className={styles.serviceCol}>
            <p className={`${styles.serviceTitle} ${col.accent === "blue" ? styles.accentBlue : styles.accentViolet}`}>
              {col.title}
            </p>
            <ul className={styles.serviceList}>
              {col.items.map((item) => (
                <li key={item}>
                  <span
                    className={`${styles.checkDot} ${col.accent === "blue" ? styles.checkDotBlue : styles.checkDotViolet}`}
                  >
                    <CheckIcon />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* DIFERENCIAL */}
      <div className={styles.differential}>
        <p>Resultados medibles en 30 días o no pagás.</p>
      </div>

      {/* CTA */}
      <div className={styles.ctaBlock}>
        <div className={styles.ctaContact}>
          <p className={styles.ctaLabel}>Contactanos</p>
          <p className={styles.ctaLine}>
            <MailIcon /> helloworld@2teams-ai.com
          </p>
          <p className={styles.ctaLine}>
            <PhoneIcon /> +1786-501-4363
          </p>
          <p className={styles.ctaLine}>
            <GlobeIcon /> 2teams-ai.com
          </p>
          <a className={styles.ctaButton} href="https://2teams-ai.com/landing">
            Hablemos
          </a>
        </div>
        <div className={styles.qrBox}>
          <div className={styles.qrImg} dangerouslySetInnerHTML={{ __html: qrSvg }} />
          <span>Escaneá y conocé más</span>
        </div>
      </div>

      {/* FOOTER */}
      <div className={styles.footer}>
        <p>www.2teams-ai.com</p>
        <p>Especialistas en IA integrada</p>
      </div>
    </div>
  );
}
