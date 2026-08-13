const SITE_URL = "https://2teams-ai.com";
const CANVAS_WIDTH = 500;
const CANVAS_HEIGHT = 620;
const QR_SIZE = 420;
const QR_MARGIN = 40;
const EXPORT_SCALE = 2;

function displayNameFromSlug(slug: string): string {
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}

function brandFont(cssVar: string, fallback: string): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();
  return value || fallback;
}

export async function downloadQrCode(slug: string): Promise<void> {
  const QRCode = (await import("qrcode")).default;
  const displayName = displayNameFromSlug(slug);
  const targetUrl = `${SITE_URL}/${slug}`;

  const qrCanvas = document.createElement("canvas");
  await QRCode.toCanvas(qrCanvas, targetUrl, {
    width: QR_SIZE,
    margin: 1,
    color: { dark: "#12121a", light: "#fafafa" },
  });

  if (document.fonts?.ready) await document.fonts.ready;
  const displayFont = brandFont("--font-display", "sans-serif");
  const bodyFont = brandFont("--font-body", "sans-serif");

  const canvas = document.createElement("canvas");
  canvas.width = CANVAS_WIDTH * EXPORT_SCALE;
  canvas.height = CANVAS_HEIGHT * EXPORT_SCALE;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.scale(EXPORT_SCALE, EXPORT_SCALE);

  ctx.fillStyle = "#fafafa";
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.drawImage(qrCanvas, QR_MARGIN, QR_MARGIN, QR_SIZE, QR_SIZE);

  const dividerY = QR_MARGIN + QR_SIZE + 28;
  ctx.strokeStyle = "#e2e2e5";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(QR_MARGIN, dividerY);
  ctx.lineTo(CANVAS_WIDTH - QR_MARGIN, dividerY);
  ctx.stroke();

  ctx.textAlign = "center";
  ctx.fillStyle = "#12121a";
  ctx.font = `700 26px ${displayFont}`;
  ctx.fillText(`2Teams.AI / ${displayName}`, CANVAS_WIDTH / 2, dividerY + 34);

  ctx.fillStyle = "#ff6b3d";
  ctx.font = `600 15px ${displayFont}`;
  ctx.fillText("Soluciones Inteligentes", CANVAS_WIDTH / 2, dividerY + 58);

  ctx.fillStyle = "#4b5563";
  ctx.font = `500 18px ${bodyFont}`;
  ctx.fillText(`2teams-ai.com/${slug}`, CANVAS_WIDTH / 2, dividerY + 88);

  const dataUrl = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = `2Teams-AI-${displayName}-QR.png`;
  a.click();
}
