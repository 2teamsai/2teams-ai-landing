import type { Metadata } from "next";
import Image from "next/image";
import styles from "./BrandGuidelines.module.css";

export const metadata: Metadata = {
  title: "2Teams.AI — Brand Guidelines",
  description: "Manual de marca de 2Teams.AI: logo, tipografía, colores y usos correctos.",
};

type Swatch = { name: string; role: string; hex: string };

const BRAND_SWATCHES: Swatch[] = [
  { name: "Azul 2Teams", role: "Primario — el “2T” del wordmark", hex: "#4C6FFF" },
  { name: "Violeta eams", role: "Secundario — la palabra “eams”", hex: "#6C5CE7" },
  { name: "Violeta claro", role: "Acento — hovers y highlights", hex: "#8F7FFF" },
  { name: "Naranja .AI", role: "Acento — el “.AI” del wordmark", hex: "#FF6B3D" },
  { name: "Naranja claro", role: "Acento — CTAs y labels sobre fondo oscuro", hex: "#FFA35C" },
];

const NEUTRAL_SWATCHES: Swatch[] = [
  { name: "Negro base", role: "Fondo principal del sitio", hex: "#05060A" },
  { name: "Gris elevado", role: "Paneles y tarjetas sobre el fondo", hex: "#0F1320" },
  { name: "Gris medio", role: "Texto secundario", hex: "#8A90A6" },
  { name: "Gris tenue", role: "Texto terciario y bordes", hex: "#565C72" },
  { name: "Blanco hueso", role: "Texto principal sobre fondo oscuro", hex: "#F3F4F8" },
];

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToCmyk(r: number, g: number, b: number): [number, number, number, number] {
  if (r === 0 && g === 0 && b === 0) return [0, 0, 0, 100];
  const rp = r / 255;
  const gp = g / 255;
  const bp = b / 255;
  const k = 1 - Math.max(rp, gp, bp);
  const c = (1 - rp - k) / (1 - k);
  const m = (1 - gp - k) / (1 - k);
  const y = (1 - bp - k) / (1 - k);
  return [Math.round(c * 100), Math.round(m * 100), Math.round(y * 100), Math.round(k * 100)];
}

function ColorCard({ swatch }: { swatch: Swatch }) {
  const [r, g, b] = hexToRgb(swatch.hex);
  const [c, m, y, k] = rgbToCmyk(r, g, b);
  return (
    <div className={styles.colorCard}>
      <div className={styles.swatch} style={{ background: swatch.hex }} />
      <div className={styles.colorInfo}>
        <p className={styles.colorName}>{swatch.name}</p>
        <p className={styles.colorRole}>{swatch.role}</p>
        <dl className={styles.colorCodes}>
          <div>
            <dt>HEX</dt>
            <dd>{swatch.hex.toUpperCase()}</dd>
          </div>
          <div>
            <dt>RGB</dt>
            <dd>
              {r}, {g}, {b}
            </dd>
          </div>
          <div>
            <dt>CMYK*</dt>
            <dd>
              {c}, {m}, {y}, {k}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

const today = new Date().toLocaleDateString("es-AR", { year: "numeric", month: "long" });

export default function BrandGuidelinesPage() {
  return (
    <main className={styles.doc}>
      {/* 1. PORTADA */}
      <section className={`${styles.page} ${styles.cover}`}>
        <div className={styles.coverBrainGlow} aria-hidden="true" />
        <Image
          src="/brand-guidelines/logo-color.png"
          alt=""
          width={140}
          height={140}
          className={styles.coverLogo}
          priority
        />
        <div className={styles.coverWordmark}>
          <span className={styles.wmBlue}>2T</span>
          <span className={styles.wmViolet}>eams</span>
          <span className={styles.wmOrange}>.AI</span>
        </div>
        <p className={styles.coverSlogan}>Soluciones Inteligentes</p>
        <div className={styles.coverDivider} />
        <h1 className={styles.coverTitle}>Brand Guidelines</h1>
        <p className={styles.coverSubtitle}>Manual de marca — uso del logo, tipografía y color</p>
        <p className={styles.coverDate}>{today}</p>
      </section>

      {/* 2. IDENTIDAD VISUAL — LOGO */}
      <section className={styles.page}>
        <SectionHeader kicker="Identidad visual" title="El logo" index="01" />
        <p className={styles.lead}>
          El logo de 2Teams.AI combina un ícono de “dos cerebros” — inteligencia artificial y
          equipo humano trabajando como una sola mente — con el wordmark en tres colores. Nunca se
          separan sus tres partes de color: 2T en azul, eams en violeta, .AI en naranja.
        </p>

        <div className={styles.logoShowcase}>
          <div className={styles.logoShowcaseTile}>
            <Image src="/brand-guidelines/logo-color.png" alt="Logo 2Teams.AI a color" width={120} height={120} />
            <p>Ícono</p>
          </div>
          <div className={`${styles.logoShowcaseTile} ${styles.logoShowcaseWordmark}`}>
            <div className={styles.wordmarkLg}>
              <span className={styles.wmBlue}>2T</span>
              <span className={styles.wmViolet}>eams</span>
              <span className={styles.wmOrange}>.AI</span>
            </div>
            <p>Wordmark</p>
          </div>
        </div>

        <h3 className={styles.subTitle}>Versión vertical (uso principal)</h3>
        <div className={styles.lockupRow}>
          <div className={styles.lockupCard}>
            <Image src="/brand-guidelines/logo-color.png" alt="" width={44} height={44} />
            <div className={styles.wordmarkSm}>
              <span className={styles.wmBlue}>2T</span>
              <span className={styles.wmViolet}>eams</span>
              <span className={styles.wmOrange}>.AI</span>
            </div>
          </div>
        </div>

        <h3 className={styles.subTitle}>Versión horizontal (headers angostos, firmas)</h3>
        <div className={styles.lockupRow}>
          <div className={`${styles.lockupCard} ${styles.lockupHorizontal}`}>
            <Image src="/brand-guidelines/logo-color.png" alt="" width={40} height={40} />
            <div className={styles.wordmarkSm}>
              <span className={styles.wmBlue}>2T</span>
              <span className={styles.wmViolet}>eams</span>
              <span className={styles.wmOrange}>.AI</span>
            </div>
          </div>
        </div>

        <h3 className={styles.subTitle}>Zona de protección y tamaño mínimo</h3>
        <div className={styles.clearSpaceBox}>
          <div className={styles.clearSpaceGuide}>
            <Image src="/brand-guidelines/logo-color.png" alt="" width={80} height={80} />
          </div>
          <p className={styles.caption}>
            Dejá un margen mínimo equivalente a la altura del ícono (“X”) en los cuatro lados. Ningún
            texto, borde o elemento gráfico puede invadir esa zona.
          </p>
        </div>
        <div className={styles.minSizeRow}>
          <div className={styles.minSizeItem}>
            <Image src="/brand-guidelines/logo-color.png" alt="" width={24} height={24} />
            <span>24px — mínimo digital (favicon, apps)</span>
          </div>
          <div className={styles.minSizeItem}>
            <Image src="/brand-guidelines/logo-color.png" alt="" width={44} height={44} />
            <span>44px — mínimo recomendado en pantalla</span>
          </div>
          <div className={styles.minSizeItem}>
            <span className={styles.mmBadge}>20mm</span>
            <span>Mínimo en impresión (tarjetas, merchandising)</span>
          </div>
        </div>

        <h3 className={styles.subTitle}>Versiones monocromáticas</h3>
        <div className={styles.monoRow}>
          <div className={`${styles.monoTile} ${styles.monoDark}`}>
            <Image src="/brand-guidelines/logo-white.png" alt="Logo en blanco" width={90} height={90} />
            <p>Blanco — sobre fondos oscuros o de color</p>
          </div>
          <div className={`${styles.monoTile} ${styles.monoLight}`}>
            <Image src="/brand-guidelines/logo-black.png" alt="Logo en negro" width={90} height={90} />
            <p>Negro — impresión a 1 color, fax, sellos</p>
          </div>
          <div className={`${styles.monoTile} ${styles.monoLight}`}>
            <Image src="/brand-guidelines/logo-color.png" alt="Logo a color" width={90} height={90} />
            <p>Color — uso por defecto</p>
          </div>
        </div>

        <div className={styles.downloadNote}>
          Archivo transparente en alta resolución:{" "}
          <code>2Teams-AI-Logo-Transparente.png</code> (2000×2000px, fondo transparente).
        </div>
      </section>

      {/* 3. TIPOGRAFÍA */}
      <section className={styles.page}>
        <SectionHeader kicker="Identidad visual" title="Tipografía" index="02" />
        <p className={styles.lead}>
          Tres familias tipográficas, cada una con un rol fijo. No se reemplazan entre sí ni se
          agregan fuentes adicionales al sistema.
        </p>

        <div className={styles.typeSpecimen}>
          <p className={styles.typeLabel}>Titulares — Space Grotesk (600 / 700)</p>
          <p className={styles.typeSampleDisplay}>Aa Bb Cc 123</p>
          <p className={styles.typeSampleDisplaySm}>2Teams.AI — Soluciones Inteligentes</p>
          <div className={styles.typeUse}>Uso: H1, H2, títulos de tarjeta, wordmark. Tamaños: 20px – 72px.</div>
        </div>

        <div className={styles.typeSpecimen}>
          <p className={styles.typeLabel}>Texto — Inter (400 / 500)</p>
          <p className={styles.typeSampleBody}>
            Automatizamos tu operación y aceleramos tu crecimiento — con IA integrada, no como
            función agregada.
          </p>
          <div className={styles.typeUse}>Uso: párrafos, botones, formularios. Tamaños: 13px – 18px.</div>
        </div>

        <div className={styles.typeSpecimen}>
          <p className={styles.typeLabel}>Labels y datos — IBM Plex Mono (400 / 500)</p>
          <p className={styles.typeSampleMono}>AGENCIA DE IA + MARKETING · USA · ARGENTINA · COLOMBIA</p>
          <div className={styles.typeUse}>
            Uso: eyebrows, kickers, badges, datos técnicos. Tamaños: 11px – 14px, uppercase, tracking amplio.
          </div>
        </div>
      </section>

      {/* 4. PALETA DE COLORES */}
      <section className={styles.page}>
        <SectionHeader kicker="Identidad visual" title="Paleta de colores" index="03" />
        <p className={styles.lead}>
          Tres colores de marca y una escala neutra. El azul y el violeta comunican tecnología e
          inteligencia; el naranja aporta energía y es siempre el acento, nunca el color dominante.
        </p>

        <h3 className={styles.subTitle}>Colores de marca</h3>
        <div className={styles.colorGrid}>
          {BRAND_SWATCHES.map((s) => (
            <ColorCard key={s.hex} swatch={s} />
          ))}
        </div>

        <h3 className={styles.subTitle}>Neutros</h3>
        <div className={styles.colorGrid}>
          {NEUTRAL_SWATCHES.map((s) => (
            <ColorCard key={s.hex} swatch={s} />
          ))}
        </div>

        <p className={styles.footnote}>
          *Los valores CMYK son una conversión aproximada para referencia. Para impresión offset,
          pedile al taller un perfil de color (ICC) calibrado contra estos HEX/RGB.
        </p>
      </section>

      {/* 6. MOCKUPS */}
      <section className={styles.page}>
        <SectionHeader kicker="Aplicación de marca" title="Mockups" index="04" />
        <p className={styles.lead}>
          Ilustraciones de referencia para ver el logo en contexto. Para producción real (impresión
          textil, merchandising), usar el archivo transparente en alta resolución.
        </p>

        <h3 className={styles.subTitle}>Camisetas polo</h3>
        <div className={styles.shirtRow}>
          <div className={styles.shirtMockup}>
            <PoloShirt color="#f3f4f8" logoSrc="/brand-guidelines/logo-color.png" />
            <p className={styles.caption}>Polo blanca — logo a color, pecho izquierdo (~6cm)</p>
          </div>
          <div className={styles.shirtMockup}>
            <PoloShirt color="#0f1320" logoSrc="/brand-guidelines/logo-white.png" />
            <p className={styles.caption}>Polo negra — logo en blanco, pecho izquierdo (~6cm)</p>
          </div>
        </div>

        <h3 className={styles.subTitle}>Fondos</h3>
        <div className={styles.bgRow}>
          <div className={`${styles.bgTile} ${styles.bgWhite}`}>
            <Image src="/brand-guidelines/logo-color.png" alt="" width={64} height={64} />
          </div>
          <div className={`${styles.bgTile} ${styles.bgBlack}`}>
            <Image src="/brand-guidelines/logo-white.png" alt="" width={64} height={64} />
          </div>
          <div className={`${styles.bgTile} ${styles.bgGradient}`}>
            <Image src="/brand-guidelines/logo-white.png" alt="" width={64} height={64} />
          </div>
        </div>
      </section>

      {/* 7 & 8. USOS CORRECTOS / INCORRECTOS */}
      <section className={styles.page}>
        <SectionHeader kicker="Reglas de uso" title="Usos correctos e incorrectos" index="05" />

        <h3 className={`${styles.subTitle} ${styles.okTitle}`}>✅ Correcto</h3>
        <div className={styles.usageGrid}>
          <div className={`${styles.usageTile} ${styles.usageOk}`}>
            <div className={styles.miniLight}>
              <Image src="/brand-guidelines/logo-color.png" alt="" width={48} height={48} />
            </div>
            <p>Logo a color sobre fondo claro</p>
          </div>
          <div className={`${styles.usageTile} ${styles.usageOk}`}>
            <div className={styles.miniDark}>
              <Image src="/brand-guidelines/logo-color.png" alt="" width={48} height={48} />
            </div>
            <p>Logo a color sobre fondo oscuro</p>
          </div>
          <div className={`${styles.usageTile} ${styles.usageOk}`}>
            <div className={styles.miniDark} style={{ padding: 32 }}>
              <Image src="/brand-guidelines/logo-color.png" alt="" width={40} height={40} />
            </div>
            <p>Con espacio de protección respetado</p>
          </div>
          <div className={`${styles.usageTile} ${styles.usageOk}`}>
            <div className={styles.miniDark}>
              <div className={styles.miniLockup}>
                <Image src="/brand-guidelines/logo-color.png" alt="" width={36} height={36} />
                <span className={styles.miniSlogan}>Soluciones Inteligentes</span>
              </div>
            </div>
            <p>Con el eslogan integrado debajo</p>
          </div>
        </div>

        <h3 className={`${styles.subTitle} ${styles.badTitle}`}>❌ Incorrecto</h3>
        <div className={styles.usageGrid}>
          <div className={`${styles.usageTile} ${styles.usageBad}`}>
            <div className={styles.miniLight}>
              <Image
                src="/brand-guidelines/logo-color.png"
                alt=""
                width={70}
                height={40}
                style={{ objectFit: "fill" }}
              />
            </div>
            <p>Logo distorsionado / estirado</p>
          </div>
          <div className={`${styles.usageTile} ${styles.usageBad}`}>
            <div className={styles.miniDark} style={{ padding: 2 }}>
              <Image src="/brand-guidelines/logo-color.png" alt="" width={70} height={70} />
              <span className={styles.crowdText}>texto pegado al logo</span>
            </div>
            <p>Sin espacio de protección</p>
          </div>
          <div className={`${styles.usageTile} ${styles.usageBad}`}>
            <div className={styles.miniLowContrast}>
              <Image src="/brand-guidelines/logo-white.png" alt="" width={48} height={48} />
            </div>
            <p>Sobre un fondo sin contraste suficiente</p>
          </div>
          <div className={`${styles.usageTile} ${styles.usageBad}`}>
            <div className={styles.miniLight}>
              <Image
                src="/brand-guidelines/logo-black.png"
                alt=""
                width={48}
                height={48}
                style={{ filter: "hue-rotate(90deg) saturate(4)" }}
              />
            </div>
            <p>Con colores fuera de la paleta de marca</p>
          </div>
        </div>
      </section>

      {/* 8. APLICACIONES */}
      <section className={styles.page}>
        <SectionHeader kicker="Aplicación de marca" title="Aplicaciones" index="06" />

        <div className={styles.appGrid}>
          <div className={styles.appCard}>
            <p className={styles.appLabel}>Tarjeta de negocio</p>
            <div className={styles.bizCard}>
              <div className={styles.bizCardLogo}>
                <Image src="/brand-guidelines/logo-color.png" alt="" width={28} height={28} />
                <div className={styles.wordmarkXs}>
                  <span className={styles.wmBlue}>2T</span>
                  <span className={styles.wmViolet}>eams</span>
                  <span className={styles.wmOrange}>.AI</span>
                </div>
              </div>
              <div className={styles.bizCardInfo}>
                <p className={styles.bizCardName}>Nombre Apellido</p>
                <p className={styles.bizCardRole}>Cargo</p>
              </div>
            </div>
          </div>

          <div className={styles.appCard}>
            <p className={styles.appLabel}>Firma de email</p>
            <div className={styles.emailSig}>
              <Image src="/brand-guidelines/logo-color.png" alt="" width={36} height={36} />
              <div>
                <p className={styles.sigName}>Nombre Apellido</p>
                <p className={styles.sigRole}>Cargo — 2Teams.AI</p>
                <p className={styles.sigContact}>helloworld@2teams-ai.com · 2teams-ai.com</p>
              </div>
            </div>
          </div>

          <div className={styles.appCard}>
            <p className={styles.appLabel}>Perfil de redes sociales</p>
            <div className={styles.socialPreview}>
              <div className={styles.socialAvatar}>
                <Image src="/brand-guidelines/logo-white.png" alt="" width={44} height={44} />
              </div>
              <div>
                <p className={styles.sigName}>2Teams.AI</p>
                <p className={styles.sigRole}>@2teamsai</p>
              </div>
            </div>
          </div>

          <div className={styles.appCard}>
            <p className={styles.appLabel}>Favicon</p>
            <div className={styles.browserMock}>
              <div className={styles.browserTab}>
                <Image src="/brand-guidelines/logo-color.png" alt="" width={14} height={14} />
                <span>2Teams.AI</span>
              </div>
              <div className={styles.browserBody} />
            </div>
          </div>
        </div>
      </section>

      {/* CONTRAPORTADA */}
      <section className={`${styles.page} ${styles.backCover}`}>
        <Image src="/brand-guidelines/logo-color.png" alt="" width={64} height={64} />
        <p className={styles.backWordmark}>
          <span className={styles.wmBlue}>2T</span>
          <span className={styles.wmViolet}>eams</span>
          <span className={styles.wmOrange}>.AI</span>
        </p>
        <p className={styles.backTagline}>Soluciones Inteligentes</p>
        <p className={styles.backContact}>helloworld@2teams-ai.com · 2teams-ai.com</p>
      </section>
    </main>
  );
}

function SectionHeader({ kicker, title, index }: { kicker: string; title: string; index: string }) {
  return (
    <div className={styles.sectionHeader}>
      <span className={styles.sectionIndex}>{index}</span>
      <div>
        <p className={styles.kicker}>{kicker}</p>
        <h2 className={styles.sectionTitle}>{title}</h2>
      </div>
    </div>
  );
}

function PoloShirt({ color, logoSrc }: { color: string; logoSrc: string }) {
  return (
    <svg viewBox="0 0 200 220" width="180" height="198" className={styles.shirtSvg}>
      <path
        d="M60 10 L80 0 L100 18 L120 0 L140 10 L170 40 L150 65 L135 55 L135 210 L65 210 L65 55 L50 65 L30 40 Z"
        fill={color}
        stroke="rgba(0,0,0,0.12)"
        strokeWidth="2"
      />
      <path d="M85 8 Q100 26 115 8" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="2" />
      <image href={logoSrc} x="76" y="55" width="22" height="22" />
    </svg>
  );
}
