"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import styles from "./Editor.module.css";

type BgMode = "transparent" | "white" | "black" | "custom";
type FillMode = "brand" | "gradient" | "solid";
type Layout = "vertical" | "horizontal";

type Segment = { text: string; color: string; scale: number };

const ICON_BBOX = { x0: 57, y0: 93, x1: 744, y1: 706 };
const ICON_W = ICON_BBOX.x1 - ICON_BBOX.x0;
const ICON_H = ICON_BBOX.y1 - ICON_BBOX.y0;

const BRAND_GRADIENT_LINE = { x1: 531.768, y1: 215.49, x2: 245.4, y2: 542.52 };
const BRAND_GRADIENT_STOPS: [number, string][] = [
  [0.0, "#DC6020"],
  [0.15, "#AF5337"],
  [0.344, "#803E49"],
  [0.538, "#562B61"],
  [0.697, "#33266F"],
  [0.852, "#1F3D86"],
  [1.0, "#194C96"],
];

const BRAND_SWATCHES = [
  "#4C6FFF",
  "#6C5CE7",
  "#8F7FFF",
  "#FF6B3D",
  "#FFA35C",
  "#05060A",
  "#0F1320",
  "#8A90A6",
  "#565C72",
  "#F3F4F8",
  "#FFFFFF",
  "#000000",
];

const DEFAULT_SEGMENTS: Segment[] = [
  { text: "2T", color: "#4C6FFF", scale: 1 },
  { text: "eams", color: "#6C5CE7", scale: 1 },
  { text: ".AI", color: "#FF6B3D", scale: 0.88 },
];

const FONT_FAMILY = '"Space Grotesk", sans-serif';

function fontStr(weight: number, px: number) {
  return `${weight} ${px}px ${FONT_FAMILY}`;
}

type Offset = { x: number; y: number };
type ElementKey = "icon" | "wordmark" | "tagline";
const ZERO_OFFSET: Offset = { x: 0, y: 0 };

type DrawState = {
  fillMode: FillMode;
  solidColor: string;
  gradStart: string;
  gradEnd: string;
  gradAngle: number;
  wordmarkOn: boolean;
  segments: Segment[];
  taglineOn: boolean;
  taglineText: string;
  taglineColor: string;
  layout: Layout;
  iconRatio: number;
  bg: BgMode;
  bgCustom: string;
  // Manual drag offsets, as a fraction of canvas width/height so they scale
  // cleanly between the live preview and any export resolution.
  offsets: Record<ElementKey, Offset>;
};

function gradientLineForAngle(angleDeg: number) {
  // angle: 0 = pointing up, clockwise (like CSS gradient angle), centered on bbox, length covers corners
  const rad = (angleDeg * Math.PI) / 180;
  const dx = Math.sin(rad) * 0.75;
  const dy = -Math.cos(rad) * 0.75;
  return { x1: 0.5 - dx, y1: 0.5 - dy, x2: 0.5 + dx, y2: 0.5 + dy };
}

type Measure = (weight: number, px: number, text: string) => number;

type Layout2D = {
  iconX: number;
  iconY: number;
  iconScale: number;
  iconDrawW: number;
  iconDrawH: number;
  wmFontPx: number;
  wmX: number;
  wmBaselineY: number;
  wmTotalW: number;
  segWidths: number[];
  tagFontPx: number;
  tagX: number;
  tagY: number;
  tagW: number;
};

// Text is fit to a target WIDTH (not a fixed font size) so arbitrary user text
// never overflows the canvas, then clamped so very short text doesn't blow up huge.
function computeLayout(measure: Measure, w: number, h: number, state: DrawState): Layout2D {
  const iconDrawW = w * state.iconRatio * (state.layout === "horizontal" ? 0.55 : 1);
  const iconScale = iconDrawW / ICON_W;
  const iconDrawH = ICON_H * iconScale;

  const REF = 100;
  let wmFontPx = iconDrawW * 0.16;
  let segWidths: number[] = [];
  let wmTotalW = 0;
  const hasWordmark = state.wordmarkOn && state.segments.some((s) => s.text);
  if (hasWordmark) {
    const refWidths = state.segments.map((s) => measure(700, REF * s.scale, s.text || ""));
    const refTotal = refWidths.reduce((a, b) => a + b, 0) || 1;
    const targetW = iconDrawW * (state.layout === "horizontal" ? 0.9 : 0.85);
    let scaleFactor = targetW / refTotal;
    wmFontPx = REF * scaleFactor;
    const maxFont = state.layout === "horizontal" ? iconDrawH * 0.5 : iconDrawH * 0.3;
    if (wmFontPx > maxFont) {
      scaleFactor *= maxFont / wmFontPx;
      wmFontPx = maxFont;
    }
    segWidths = refWidths.map((rw) => rw * scaleFactor);
    wmTotalW = segWidths.reduce((a, b) => a + b, 0);
  }

  let tagFontPx = wmFontPx * 0.42;
  let tagW = 0;
  if (state.taglineOn && state.taglineText) {
    tagW = measure(600, tagFontPx, state.taglineText);
    const maxTagW = iconDrawW * (state.layout === "horizontal" ? 1.3 : 1.0);
    if (tagW > maxTagW) {
      const f = maxTagW / tagW;
      tagFontPx *= f;
      tagW *= f;
    }
  }

  let iconX: number, iconY: number, wmX: number, wmBaselineY: number, tagX: number, tagY: number;

  if (state.layout === "vertical") {
    const gap = iconDrawH * 0.06;
    const tagGap = state.taglineOn ? tagFontPx * 1.1 : 0;
    const totalH = iconDrawH + (hasWordmark ? gap + wmFontPx * 0.95 : 0) + tagGap;
    const top = (h - totalH) / 2;
    iconX = w / 2 - iconDrawW / 2;
    iconY = top;
    wmX = w / 2 - wmTotalW / 2;
    wmBaselineY = top + iconDrawH + gap + wmFontPx * 0.72;
    tagX = w / 2 - tagW / 2;
    tagY = wmBaselineY + tagFontPx * 1.5;
  } else {
    const gap = iconDrawW * 0.1;
    const rowW = iconDrawW + gap + wmTotalW;
    const left = (w - rowW) / 2;
    iconX = left;
    iconY = h / 2 - iconDrawH / 2;
    wmX = left + iconDrawW + gap;
    wmBaselineY = h / 2 + wmFontPx * 0.3;
    tagX = w / 2 - tagW / 2;
    tagY = iconY + iconDrawH + tagFontPx * 1.7;
  }

  iconX += state.offsets.icon.x * w;
  iconY += state.offsets.icon.y * h;
  wmX += state.offsets.wordmark.x * w;
  wmBaselineY += state.offsets.wordmark.y * h;
  tagX += state.offsets.tagline.x * w;
  tagY += state.offsets.tagline.y * h;

  return {
    iconX,
    iconY,
    iconScale,
    iconDrawW,
    iconDrawH,
    wmFontPx,
    wmX,
    wmBaselineY,
    wmTotalW,
    segWidths,
    tagFontPx,
    tagX,
    tagY,
    tagW,
  };
}

function elementBounds(layout: Layout2D, key: ElementKey) {
  if (key === "icon") {
    return { x: layout.iconX, y: layout.iconY, w: layout.iconDrawW, h: layout.iconDrawH };
  }
  if (key === "wordmark") {
    return {
      x: layout.wmX,
      y: layout.wmBaselineY - layout.wmFontPx * 0.82,
      w: layout.wmTotalW,
      h: layout.wmFontPx * 1.05,
    };
  }
  return {
    x: layout.tagX,
    y: layout.tagY - layout.tagFontPx * 0.82,
    w: layout.tagW,
    h: layout.tagFontPx * 1.05,
  };
}

function drawLogo(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  iconPath: Path2D,
  state: DrawState,
  selected?: ElementKey | null
) {
  ctx.clearRect(0, 0, w, h);

  if (state.bg === "white") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
  } else if (state.bg === "black") {
    ctx.fillStyle = "#05060a";
    ctx.fillRect(0, 0, w, h);
  } else if (state.bg === "custom") {
    ctx.fillStyle = state.bgCustom;
    ctx.fillRect(0, 0, w, h);
  }

  const measure: Measure = (weight, px, text) => {
    ctx.font = fontStr(weight, px);
    return ctx.measureText(text).width;
  };
  const layout = computeLayout(measure, w, h, state);
  const { iconX, iconY, iconScale, wmFontPx, wmX, wmBaselineY, segWidths, tagFontPx, tagX, tagY } = layout;

  ctx.save();
  ctx.translate(iconX - ICON_BBOX.x0 * iconScale, iconY - ICON_BBOX.y0 * iconScale);
  ctx.scale(iconScale, iconScale);
  if (state.fillMode === "solid") {
    ctx.fillStyle = state.solidColor;
  } else {
    const line =
      state.fillMode === "brand"
        ? BRAND_GRADIENT_LINE
        : (() => {
            const f = gradientLineForAngle(state.gradAngle);
            return {
              x1: ICON_BBOX.x0 + f.x1 * ICON_W,
              y1: ICON_BBOX.y0 + f.y1 * ICON_H,
              x2: ICON_BBOX.x0 + f.x2 * ICON_W,
              y2: ICON_BBOX.y0 + f.y2 * ICON_H,
            };
          })();
    const grad = ctx.createLinearGradient(line.x1, line.y1, line.x2, line.y2);
    if (state.fillMode === "brand") {
      for (const [off, color] of BRAND_GRADIENT_STOPS) grad.addColorStop(off, color);
    } else {
      grad.addColorStop(0, state.gradStart);
      grad.addColorStop(1, state.gradEnd);
    }
    ctx.fillStyle = grad;
  }
  ctx.fill(iconPath, "evenodd");
  ctx.restore();

  if (state.wordmarkOn) {
    let x = wmX;
    ctx.textBaseline = "alphabetic";
    state.segments.forEach((seg, i) => {
      ctx.font = fontStr(700, wmFontPx * seg.scale);
      ctx.fillStyle = seg.color;
      ctx.fillText(seg.text || "", x, wmBaselineY);
      x += segWidths[i];
    });
  }

  if (state.taglineOn) {
    ctx.font = fontStr(600, tagFontPx);
    ctx.fillStyle = state.taglineColor;
    ctx.textBaseline = "alphabetic";
    ctx.fillText(state.taglineText || "", tagX, tagY);
  }

  if (selected) {
    const b = elementBounds(layout, selected);
    const pad = Math.max(4, layout.iconDrawW * 0.015);
    ctx.save();
    ctx.strokeStyle = "#4c6fff";
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(b.x - pad, b.y - pad, b.w + pad * 2, b.h + pad * 2);
    ctx.restore();
  }
}

function buildSvg(iconD: string, w: number, h: number, state: DrawState) {
  const measureCanvas = document.createElement("canvas");
  const mctx = measureCanvas.getContext("2d")!;
  const measure: Measure = (weight, px, text) => {
    mctx.font = fontStr(weight, px);
    return mctx.measureText(text).width;
  };
  const { iconX, iconY, iconScale, wmFontPx, wmX, wmBaselineY, segWidths, tagFontPx, tagX, tagY } =
    computeLayout(measure, w, h, state);

  let fillAttr = "";
  let defs = "";
  if (state.fillMode === "solid") {
    fillAttr = `fill="${state.solidColor}"`;
  } else {
    const line =
      state.fillMode === "brand"
        ? BRAND_GRADIENT_LINE
        : (() => {
            const f = gradientLineForAngle(state.gradAngle);
            return {
              x1: ICON_BBOX.x0 + f.x1 * ICON_W,
              y1: ICON_BBOX.y0 + f.y1 * ICON_H,
              x2: ICON_BBOX.x0 + f.x2 * ICON_W,
              y2: ICON_BBOX.y0 + f.y2 * ICON_H,
            };
          })();
    const stops =
      state.fillMode === "brand"
        ? BRAND_GRADIENT_STOPS.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join("")
        : `<stop offset="0" stop-color="${state.gradStart}"/><stop offset="1" stop-color="${state.gradEnd}"/>`;
    defs = `<defs><linearGradient id="g" gradientUnits="userSpaceOnUse" x1="${line.x1}" y1="${line.y1}" x2="${line.x2}" y2="${line.y2}">${stops}</linearGradient></defs>`;
    fillAttr = `fill="url(#g)"`;
  }

  const iconTransform = `translate(${iconX - ICON_BBOX.x0 * iconScale} ${iconY - ICON_BBOX.y0 * iconScale}) scale(${iconScale})`;

  let wmSvg = "";
  if (state.wordmarkOn) {
    let x = wmX;
    wmSvg = state.segments
      .map((seg, i) => {
        const el = `<text x="${x}" y="${wmBaselineY}" font-family='Space Grotesk, sans-serif' font-weight="700" font-size="${
          wmFontPx * seg.scale
        }" fill="${seg.color}">${escapeXml(seg.text)}</text>`;
        x += segWidths[i];
        return el;
      })
      .join("");
  }

  const tagSvg = state.taglineOn
    ? `<text x="${tagX}" y="${tagY}" font-family='Space Grotesk, sans-serif' font-weight="600" font-size="${tagFontPx}" fill="${state.taglineColor}">${escapeXml(
        state.taglineText
      )}</text>`
    : "";

  const bgRect =
    state.bg === "transparent"
      ? ""
      : `<rect width="${w}" height="${h}" fill="${
          state.bg === "white" ? "#ffffff" : state.bg === "black" ? "#05060a" : state.bgCustom
        }"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${defs}${bgRect}<g transform="${iconTransform}"><path d="${iconD}" ${fillAttr} fill-rule="evenodd"/></g>${wmSvg}${tagSvg}</svg>`;
}

function escapeXml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const SIZE_PRESETS = [2, 3, 4, 5, 6, 8, 10];
const DPI_OPTIONS = [72, 150, 300];
const PREVIEW_SIZE = 640;

export default function LogoEditorPage() {
  const [iconD, setIconD] = useState<string | null>(null);
  const [fontsReady, setFontsReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathRef = useRef<Path2D | null>(null);

  const [offsets, setOffsets] = useState<Record<ElementKey, Offset>>({
    icon: { ...ZERO_OFFSET },
    wordmark: { ...ZERO_OFFSET },
    tagline: { ...ZERO_OFFSET },
  });
  const [selected, setSelected] = useState<ElementKey | null>(null);
  const dragRef = useRef<{ key: ElementKey; startX: number; startY: number; startOffset: Offset } | null>(
    null
  );

  const [fillMode, setFillMode] = useState<FillMode>("brand");
  const [solidColor, setSolidColor] = useState("#0D0D12");
  const [gradStart, setGradStart] = useState("#DC6020");
  const [gradEnd, setGradEnd] = useState("#194C96");
  const [gradAngle, setGradAngle] = useState(212);

  const [wordmarkOn, setWordmarkOn] = useState(true);
  const [segments, setSegments] = useState<Segment[]>(DEFAULT_SEGMENTS);

  const [taglineOn, setTaglineOn] = useState(false);
  const [taglineText, setTaglineText] = useState("Soluciones Inteligentes");
  const [taglineColor, setTaglineColor] = useState("#FFA35C");

  const [layout, setLayout] = useState<Layout>("vertical");
  const [iconRatio, setIconRatio] = useState(0.8);
  const [bg, setBg] = useState<BgMode>("transparent");
  const [bgCustom, setBgCustom] = useState("#05060A");

  const [exportInches, setExportInches] = useState(5);
  const [exportDpi, setExportDpi] = useState(300);
  const [customPx, setCustomPx] = useState<number | "">("");

  useEffect(() => {
    fetch("/brand-guidelines/logo-color.svg")
      .then((r) => r.text())
      .then((txt) => {
        const doc = new DOMParser().parseFromString(txt, "image/svg+xml");
        const path = doc.querySelector("path");
        const d = path?.getAttribute("d") || "";
        setIconD(d);
        pathRef.current = new Path2D(d);
      });
    const check = async () => {
      try {
        await document.fonts.load(fontStr(700, 40));
        await document.fonts.load(fontStr(600, 40));
        await document.fonts.ready;
      } catch {
        /* ignore */
      }
      setFontsReady(true);
    };
    check();
  }, []);

  const state: DrawState = {
    fillMode,
    solidColor,
    gradStart,
    gradEnd,
    gradAngle,
    wordmarkOn,
    segments,
    taglineOn,
    taglineText,
    taglineColor,
    layout,
    iconRatio,
    bg,
    bgCustom,
    offsets,
  };

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !pathRef.current) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const size = PREVIEW_SIZE;
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + "px";
    canvas.style.height = size + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drawLogo(ctx, size, size, pathRef.current, state, selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    fillMode,
    solidColor,
    gradStart,
    gradEnd,
    gradAngle,
    wordmarkOn,
    segments,
    taglineOn,
    taglineText,
    taglineColor,
    layout,
    iconRatio,
    bg,
    bgCustom,
    offsets,
    selected,
    iconD,
    fontsReady,
  ]);

  useEffect(() => {
    redraw();
  }, [redraw]);

  function updateSegment(i: number, patch: Partial<Segment>) {
    setSegments((prev) => prev.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));
  }

  function resetPositions() {
    setOffsets({ icon: { ...ZERO_OFFSET }, wordmark: { ...ZERO_OFFSET }, tagline: { ...ZERO_OFFSET } });
    setSelected(null);
  }

  function resetBrand() {
    setFillMode("brand");
    setWordmarkOn(true);
    setSegments(DEFAULT_SEGMENTS);
    setTaglineOn(false);
    setTaglineText("Soluciones Inteligentes");
    setTaglineColor("#FFA35C");
    setLayout("vertical");
    setIconRatio(0.8);
    setBg("transparent");
    resetPositions();
  }

  function hitTest(px: number, py: number): ElementKey | null {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return null;
    const measure: Measure = (weight, size, text) => {
      ctx.font = fontStr(weight, size);
      return ctx.measureText(text).width;
    };
    const layout = computeLayout(measure, PREVIEW_SIZE, PREVIEW_SIZE, state);
    const order: ElementKey[] = ["tagline", "wordmark", "icon"];
    for (const key of order) {
      if (key === "wordmark" && !state.wordmarkOn) continue;
      if (key === "tagline" && !state.taglineOn) continue;
      const b = elementBounds(layout, key);
      if (px >= b.x && px <= b.x + b.w && py >= b.y && py <= b.y + b.h) return key;
    }
    return null;
  }

  function pointerPos(e: { clientX: number; clientY: number }) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * PREVIEW_SIZE,
      y: ((e.clientY - rect.top) / rect.height) * PREVIEW_SIZE,
    };
  }

  function handlePointerDown(e: ReactPointerEvent<HTMLCanvasElement>) {
    const { x, y } = pointerPos(e);
    const key = hitTest(x, y);
    setSelected(key);
    if (key) {
      dragRef.current = { key, startX: x, startY: y, startOffset: { ...offsets[key] } };
      (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
    }
  }

  function handlePointerMove(e: ReactPointerEvent<HTMLCanvasElement>) {
    const drag = dragRef.current;
    if (!drag) return;
    const { x, y } = pointerPos(e);
    const dx = (x - drag.startX) / PREVIEW_SIZE;
    const dy = (y - drag.startY) / PREVIEW_SIZE;
    setOffsets((prev) => ({
      ...prev,
      [drag.key]: { x: drag.startOffset.x + dx, y: drag.startOffset.y + dy },
    }));
  }

  function handlePointerUp() {
    dragRef.current = null;
  }

  function getExportPx(): number {
    if (customPx && Number(customPx) > 0) return Number(customPx);
    return exportInches * exportDpi;
  }

  function downloadPng() {
    if (!pathRef.current) return;
    const px = getExportPx();
    const canvas = document.createElement("canvas");
    canvas.width = px;
    canvas.height = px;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    drawLogo(ctx, px, px, pathRef.current, state);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `2Teams-AI-logo-${px}px.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  }

  function downloadSvg() {
    if (!iconD) return;
    const px = getExportPx();
    const svg = buildSvg(iconD, px, px, state);
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `2Teams-AI-logo-${px}px.svg`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className={styles.page}>
      <div className={styles.header}>
        <h1>Editor de logo — 2Teams.AI</h1>
        <p>
          Cambiá texto, colores, degradado y fondo, y descargalo en el tamaño que necesites. Todo
          corre en tu navegador — no se sube ni se guarda nada.
        </p>
      </div>

      <div className={styles.layout}>
        <div className={styles.controls}>
          <section className={styles.group}>
            <h2>Ícono</h2>
            <div className={styles.radioRow}>
              <label>
                <input
                  type="radio"
                  checked={fillMode === "brand"}
                  onChange={() => setFillMode("brand")}
                />
                Degradado de marca
              </label>
              <label>
                <input
                  type="radio"
                  checked={fillMode === "gradient"}
                  onChange={() => setFillMode("gradient")}
                />
                Degradado personalizado
              </label>
              <label>
                <input
                  type="radio"
                  checked={fillMode === "solid"}
                  onChange={() => setFillMode("solid")}
                />
                Color sólido
              </label>
            </div>

            {fillMode === "gradient" && (
              <div className={styles.subRow}>
                <label>
                  Inicio
                  <input type="color" value={gradStart} onChange={(e) => setGradStart(e.target.value)} />
                </label>
                <label>
                  Fin
                  <input type="color" value={gradEnd} onChange={(e) => setGradEnd(e.target.value)} />
                </label>
                <label className={styles.sliderLabel}>
                  Ángulo ({gradAngle}°)
                  <input
                    type="range"
                    min={0}
                    max={359}
                    value={gradAngle}
                    onChange={(e) => setGradAngle(Number(e.target.value))}
                  />
                </label>
              </div>
            )}
            {fillMode === "solid" && (
              <div className={styles.subRow}>
                <label>
                  Color
                  <input type="color" value={solidColor} onChange={(e) => setSolidColor(e.target.value)} />
                </label>
                <div className={styles.swatchRow}>
                  {BRAND_SWATCHES.map((c) => (
                    <button
                      key={c}
                      className={styles.swatch}
                      style={{ background: c }}
                      onClick={() => setSolidColor(c)}
                      aria-label={c}
                    />
                  ))}
                </div>
              </div>
            )}
          </section>

          <section className={styles.group}>
            <div className={styles.groupHeaderRow}>
              <h2>Wordmark</h2>
              <label className={styles.toggle}>
                <input type="checkbox" checked={wordmarkOn} onChange={(e) => setWordmarkOn(e.target.checked)} />
                Mostrar
              </label>
            </div>
            {wordmarkOn &&
              segments.map((seg, i) => (
                <div className={styles.subRow} key={i}>
                  <input
                    type="text"
                    value={seg.text}
                    onChange={(e) => updateSegment(i, { text: e.target.value })}
                    className={styles.textInput}
                  />
                  <input type="color" value={seg.color} onChange={(e) => updateSegment(i, { color: e.target.value })} />
                </div>
              ))}
          </section>

          <section className={styles.group}>
            <div className={styles.groupHeaderRow}>
              <h2>Párrafo / eslogan</h2>
              <label className={styles.toggle}>
                <input type="checkbox" checked={taglineOn} onChange={(e) => setTaglineOn(e.target.checked)} />
                Mostrar
              </label>
            </div>
            {taglineOn && (
              <div className={styles.subRow}>
                <input
                  type="text"
                  value={taglineText}
                  onChange={(e) => setTaglineText(e.target.value)}
                  className={styles.textInput}
                />
                <input type="color" value={taglineColor} onChange={(e) => setTaglineColor(e.target.value)} />
              </div>
            )}
          </section>

          <section className={styles.group}>
            <div className={styles.groupHeaderRow}>
              <h2>Composición</h2>
              <button type="button" className={styles.linkBtn} onClick={resetPositions}>
                Centrar posiciones
              </button>
            </div>
            <p className={styles.hint}>
              Hacé clic en el ícono, el wordmark o el párrafo en la vista previa y arrastralo para
              moverlo libremente.
            </p>
            <div className={styles.radioRow}>
              <label>
                <input
                  type="radio"
                  checked={layout === "vertical"}
                  onChange={() => {
                    setLayout("vertical");
                    resetPositions();
                  }}
                />
                Vertical
              </label>
              <label>
                <input
                  type="radio"
                  checked={layout === "horizontal"}
                  onChange={() => {
                    setLayout("horizontal");
                    resetPositions();
                  }}
                />
                Horizontal
              </label>
            </div>
            <label className={styles.sliderLabel}>
              Tamaño del ícono ({Math.round(iconRatio * 100)}%)
              <input
                type="range"
                min={40}
                max={95}
                value={iconRatio * 100}
                onChange={(e) => setIconRatio(Number(e.target.value) / 100)}
              />
            </label>
          </section>

          <section className={styles.group}>
            <h2>Fondo</h2>
            <div className={styles.radioRow}>
              <label>
                <input type="radio" checked={bg === "transparent"} onChange={() => setBg("transparent")} />
                Transparente
              </label>
              <label>
                <input type="radio" checked={bg === "white"} onChange={() => setBg("white")} />
                Blanco
              </label>
              <label>
                <input type="radio" checked={bg === "black"} onChange={() => setBg("black")} />
                Negro
              </label>
              <label>
                <input type="radio" checked={bg === "custom"} onChange={() => setBg("custom")} />
                Personalizado
              </label>
            </div>
            {bg === "custom" && (
              <input type="color" value={bgCustom} onChange={(e) => setBgCustom(e.target.value)} />
            )}
          </section>

          <section className={styles.group}>
            <h2>Exportar</h2>
            <div className={styles.subRow}>
              <label>
                Tamaño
                <select value={exportInches} onChange={(e) => setExportInches(Number(e.target.value))}>
                  {SIZE_PRESETS.map((s) => (
                    <option key={s} value={s}>
                      {s}×{s} in
                    </option>
                  ))}
                </select>
              </label>
              <label>
                DPI
                <select value={exportDpi} onChange={(e) => setExportDpi(Number(e.target.value))}>
                  {DPI_OPTIONS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label className={styles.subRow}>
              o tamaño exacto en px
              <input
                type="number"
                placeholder="ej. 1200"
                value={customPx}
                onChange={(e) => setCustomPx(e.target.value === "" ? "" : Number(e.target.value))}
                className={styles.textInput}
              />
            </label>
            <p className={styles.exportHint}>Se exporta a {getExportPx()}×{getExportPx()}px.</p>
            <div className={styles.buttonRow}>
              <button className={styles.primaryBtn} onClick={downloadPng}>
                Descargar PNG
              </button>
              <button className={styles.secondaryBtn} onClick={downloadSvg}>
                Descargar SVG
              </button>
              <button className={styles.resetBtn} onClick={resetBrand}>
                Restablecer marca
              </button>
            </div>
          </section>
        </div>

        <div className={styles.previewWrap}>
          <div className={`${styles.previewBoard} ${bg === "transparent" ? styles.checker : ""}`}>
            <canvas
              ref={canvasRef}
              className={`${styles.canvas} ${selected ? styles.canvasDragging : ""}`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            />
          </div>
          {selected && (
            <p className={styles.selectionHint}>
              Moviendo: {selected === "icon" ? "ícono" : selected === "wordmark" ? "wordmark" : "párrafo"} — hacé
              clic afuera para soltar la selección.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
