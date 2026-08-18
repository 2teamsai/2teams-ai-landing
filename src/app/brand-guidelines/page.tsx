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

function ColorCircle({ swatch }: { swatch: Swatch }) {
  return (
    <div className={styles.colorCircleItem}>
      <div className={styles.colorCircle} style={{ background: swatch.hex }} />
      <span className={styles.colorHexBadge}>{swatch.hex.toUpperCase()}</span>
    </div>
  );
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

function PageStamp({ section, number }: { section: string; number: string }) {
  return (
    <div className={styles.pageStamp}>
      <div className={styles.stampBrand}>
        <div className={styles.stampLogo}>
          <Image src="/brand-guidelines/logo-color.png" alt="" width={16} height={16} />
          <div className={styles.wordmarkXs}>
            <span className={styles.wmBlue}>2T</span>
            <span className={styles.wmViolet}>eams</span>
            <span className={styles.wmOrange}>.AI</span>
          </div>
        </div>
        <span className={styles.stampTag}>Manual de Identidad Visual</span>
      </div>
      <div className={styles.pageFooterMeta}>
        <strong>{section}</strong>
        {number}
      </div>
    </div>
  );
}

const today = new Date().toLocaleDateString("es-AR", { year: "numeric", month: "long" });

export default function BrandGuidelinesPage() {
  return (
    <main className={styles.doc}>
      {/* PORTADA */}
      <section className={`${styles.page} ${styles.cover}`}>
        <Image
          src="/brand-guidelines/style-server-cover.jpg"
          alt=""
          fill
          className={styles.coverPhoto}
          priority
        />
        <div className={styles.coverOverlay} aria-hidden="true" />
        <p className={styles.coverKicker}>Agencia de IA + Marketing</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand-guidelines/lockup-color.svg" alt="2Teams.AI" className={styles.coverLockup} />
        <span className={styles.coverTag}>Manual de Identidad Visual</span>
        <span className={styles.coverDate}>{today}</span>
      </section>

      {/* PERFIL DE MARCA */}
      <section id="perfil" className={styles.page}>
        <div className={styles.pageInner}>
          <h2 className={styles.runningTitle}>Perfil de marca</h2>
          <p className={styles.lead} style={{ fontSize: 17, maxWidth: 720 }}>
            2Teams.AI es una agencia de IA + marketing digital con equipo repartido en Estados
            Unidos, Argentina y Colombia. Unimos un equipo de ingeniería en inteligencia artificial
            con un equipo de growth marketing bajo un mismo techo y un solo contrato, para que
            ninguna empresa tenga que elegir entre tecnología y crecimiento. Construimos software
            con IA integrada — no como función agregada — para automatizar operaciones, acelerar el
            crecimiento y resolver problemas estratégicos de negocio.
          </p>
        </div>
        <PageStamp section="Brand Profile" number="02" />
      </section>

      {/* LOGO */}
      <section id="logo" className={styles.page}>
        <div className={styles.pageInner}>
          <h2 className={styles.runningTitle}>Logo</h2>
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
              Dejá un margen mínimo equivalente a la altura del ícono (“X”) en los cuatro lados.
              Ningún texto, borde o elemento gráfico puede invadir esa zona.
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
        </div>
        <PageStamp section="Logo" number="03" />
      </section>

      {/* GRID DE CONSTRUCCIÓN */}
      <section id="grid" className={styles.page}>
        <div className={styles.pageInner}>
          <h2 className={styles.runningTitle}>Grid de construcción</h2>
          <p className={styles.lead}>
            El isotipo (ícono + wordmark) se construye sobre una grilla modular de “X” unidades.
            Usá esta proporción para escalarlo sin distorsión.
          </p>
          <div className={styles.gridWrap}>
            <div className={styles.gridBox}>
              <span className={styles.gridTickH}>
                <span className={styles.gridTickLabel}>13 X</span>
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand-guidelines/lockup-black.svg"
                alt="Grid de construcción del logo 2Teams.AI"
                className={styles.gridIcon}
              />
            </div>
          </div>
          <div className={styles.gridLegend}>
            <span>
              <b>Ancho total:</b> 13 X
            </span>
            <span>
              <b>Alto total:</b> ≈13 X
            </span>
            <span>
              <b>Margen de seguridad:</b> 1 X en los cuatro lados
            </span>
          </div>
        </div>
        <PageStamp section="Construction Grid" number="04" />
      </section>

      {/* PALETA DE COLORES */}
      <section id="color" className={styles.page}>
        <div className={styles.pageInner}>
          <h2 className={styles.runningTitle}>Color</h2>
          <p className={styles.lead}>
            Tres colores de marca y una escala neutra. El azul y el violeta comunican tecnología e
            inteligencia; el naranja aporta energía y es siempre el acento, nunca el color
            dominante.
          </p>

          <h3 className={styles.subTitle}>Colores de marca</h3>
          <div className={styles.colorCircleRow}>
            {BRAND_SWATCHES.map((s) => (
              <ColorCircle key={s.hex} swatch={s} />
            ))}
          </div>
          <div className={styles.colorGrid}>
            {BRAND_SWATCHES.map((s) => (
              <ColorCard key={s.hex} swatch={s} />
            ))}
          </div>

          <h3 className={styles.subTitle}>Neutros</h3>
          <div className={styles.colorCircleRow}>
            {NEUTRAL_SWATCHES.map((s) => (
              <ColorCircle key={s.hex} swatch={s} />
            ))}
          </div>
          <div className={styles.colorGrid}>
            {NEUTRAL_SWATCHES.map((s) => (
              <ColorCard key={s.hex} swatch={s} />
            ))}
          </div>

          <p className={styles.footnote}>
            *Los valores CMYK son una conversión aproximada para referencia. Para impresión offset,
            pedile al taller un perfil de color (ICC) calibrado contra estos HEX/RGB.
          </p>
        </div>
        <PageStamp section="Color" number="05" />
      </section>

      {/* FONDO CLARO / OSCURO */}
      <section id="split" className={styles.splitPage}>
        <div className={`${styles.splitHalf} ${styles.splitDark}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand-guidelines/lockup-white.svg"
            alt="Logo 2Teams.AI en blanco sobre fondo negro"
            className={styles.splitLogo}
          />
        </div>
        <div className={`${styles.splitHalf} ${styles.splitLight}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand-guidelines/lockup-color.svg"
            alt="Logo 2Teams.AI a color sobre fondo blanco"
            className={styles.splitLogo}
          />
        </div>
      </section>

      {/* TIPOGRAFÍA */}
      <section id="fonts" className={styles.page}>
        <div className={styles.pageInner}>
          <h2 className={styles.runningTitle}>Tipografía</h2>
          <p className={styles.lead}>
            Tres familias tipográficas, cada una con un rol fijo. No se reemplazan entre sí ni se
            agregan fuentes adicionales al sistema.
          </p>

          <div className={styles.fontBlock}>
            <p className={styles.fontRole}>Titulares</p>
            <p className={styles.fontName}>Space Grotesk</p>
            <p className={styles.fontGlyphs} style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>
              AaBbCcDdEeFfGgHhIiJj
              <br />
              KkLlMmNnOoPpQqRrSs
              <br />
              TtUuVvWwXxYyZz
              <br />
              0123456789 &amp;@$%!°
            </p>
            <div className={styles.typeUse}>Uso: H1, H2, títulos de tarjeta, wordmark. Tamaños: 20px – 72px.</div>
          </div>

          <div className={styles.fontBlock}>
            <p className={styles.fontRole}>Texto</p>
            <p className={styles.fontName}>Inter</p>
            <p className={styles.fontGlyphs} style={{ fontFamily: "var(--font-body)", fontWeight: 400, fontSize: 18 }}>
              AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz
              <br />
              0123456789 &amp;@$%{"{"}{"}"} !*°&rdquo;;.
            </p>
            <div className={styles.typeUse}>Uso: párrafos, botones, formularios. Tamaños: 13px – 18px.</div>
          </div>

          <div className={styles.fontBlock}>
            <p className={styles.fontRole}>Labels y datos</p>
            <p className={styles.fontName}>IBM Plex Mono</p>
            <p className={styles.fontGlyphs} style={{ fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: 16 }}>
              AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz
              <br />
              0123456789 &amp;@$%!°
            </p>
            <div className={styles.typeUse}>
              Uso: eyebrows, kickers, badges, datos técnicos. Tamaños: 11px – 14px, uppercase, tracking
              amplio.
            </div>
          </div>
        </div>
        <PageStamp section="Fonts" number="06" />
      </section>

      {/* POP — REMERAS Y POLOS */}
      <section id="pop" className={styles.page}>
        <div className={styles.pageInner}>
          <h2 className={styles.runningTitle}>POP — Indumentaria</h2>
          <p className={styles.lead}>
            Para impresión, el logo siempre va en color y acompañado del wordmark — nunca solo el
            ícono, nunca en blanco/negro, sin importar el color de la prenda. Frente: isotipo
            completo, 2×2 in, sobre el lado derecho del pecho. Espalda: isotipo completo, grande,
            centrado en el medio de la espalda.
          </p>

          <h3 className={styles.subTitle}>Camisetas</h3>
          <div className={styles.shirtRow}>
            <div className={styles.shirtMockup}>
              <Image
                src="/brand-guidelines/mockup-white-shirt-front.jpg"
                alt="Remera blanca, frente — isotipo a color de 2Teams.AI sobre el lado derecho del pecho, 2x2 pulgadas"
                width={765}
                height={980}
                className={styles.shirtPhoto}
              />
              <p className={styles.caption}>Remera blanca — frente, isotipo a color 2×2in, lado derecho del pecho</p>
            </div>
            <div className={styles.shirtMockup}>
              <Image
                src="/brand-guidelines/mockup-white-shirt-back.jpg"
                alt="Remera blanca, espalda — isotipo de 2Teams.AI a color con el nombre, grande y centrado en el medio de la espalda"
                width={766}
                height={980}
                className={styles.shirtPhoto}
              />
              <p className={styles.caption}>Remera blanca — espalda, isotipo a color, grande, centrado en el medio</p>
            </div>
            <div className={styles.shirtMockup}>
              <Image
                src="/brand-guidelines/mockup-black-shirt-front.jpg"
                alt="Remera negra, frente — isotipo a color de 2Teams.AI sobre el lado derecho del pecho, 2x2 pulgadas"
                width={583}
                height={700}
                className={styles.shirtPhoto}
              />
              <p className={styles.caption}>Remera negra — frente, isotipo a color 2×2in, lado derecho del pecho</p>
            </div>
            <div className={styles.shirtMockup}>
              <Image
                src="/brand-guidelines/mockup-black-shirt-back.jpg"
                alt="Remera negra, espalda — isotipo de 2Teams.AI a color con el nombre, grande y centrado en el medio de la espalda"
                width={584}
                height={700}
                className={styles.shirtPhoto}
              />
              <p className={styles.caption}>Remera negra — espalda, isotipo a color, grande, centrado en el medio</p>
            </div>
          </div>

          <h3 className={styles.subTitle}>Polos</h3>
          <div className={styles.shirtRow}>
            <div className={styles.shirtMockup}>
              <Image
                src="/brand-guidelines/mockup-white-polo.jpg"
                alt="Polo blanco con el isotipo de 2Teams.AI a color, chico, sobre el lado derecho del pecho"
                width={669}
                height={705}
                className={styles.shirtPhoto}
              />
              <p className={styles.caption}>Polo blanco — isotipo a color, 2×2in, lado derecho del pecho</p>
            </div>
            <div className={styles.shirtMockup}>
              <Image
                src="/brand-guidelines/mockup-black-polo.jpg"
                alt="Polo negro con el isotipo de 2Teams.AI a color, chico, sobre el lado derecho del pecho"
                width={669}
                height={705}
                className={styles.shirtPhoto}
              />
              <p className={styles.caption}>Polo negro — isotipo a color, 2×2in, lado derecho del pecho</p>
            </div>
          </div>
        </div>
        <PageStamp section="POP" number="07" />
      </section>

      {/* USOS CORRECTOS / INCORRECTOS */}
      <section id="usos" className={styles.page}>
        <div className={styles.pageInner}>
          <h2 className={styles.runningTitle}>Usos correctos e incorrectos</h2>

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
        </div>
        <PageStamp section="Usos" number="08" />
      </section>

      {/* POP — APLICACIONES DIGITALES */}
      <section id="digital" className={styles.page}>
        <div className={styles.pageInner}>
          <h2 className={styles.runningTitle}>POP — Aplicaciones digitales</h2>
          <p className={styles.lead}>
            2Teams.AI es una empresa de software: sus aplicaciones de marca viven en pantalla, no en
            flotas de vehículos.
          </p>

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
              <p className={styles.appLabel}>Favicon / app icon</p>
              <div className={styles.browserMock}>
                <div className={styles.browserTab}>
                  <Image src="/brand-guidelines/logo-color.png" alt="" width={14} height={14} />
                  <span>2Teams.AI</span>
                </div>
                <div className={styles.browserBody} />
              </div>
            </div>
          </div>
        </div>
        <PageStamp section="Digital" number="09" />
      </section>

      {/* CONTRAPORTADA */}
      <section id="backcover" className={`${styles.page} ${styles.backCover}`}>
        <Image
          src="/brand-guidelines/style-circuit-cover.jpg"
          alt=""
          fill
          className={styles.coverPhoto}
        />
        <div className={styles.coverOverlay} aria-hidden="true" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand-guidelines/lockup-color.svg" alt="2Teams.AI" className={styles.backLogo} />
        <p className={styles.backTagline}>Soluciones Inteligentes</p>
        <p className={styles.backContact}>helloworld@2teams-ai.com · 2teams-ai.com</p>
      </section>
    </main>
  );
}
