"use client";

import { useEffect, useRef } from "react";
import styles from "./NodeField.module.css";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
};

type Edge = { a: Node; b: Node; dist: number };

type Pulse = { a: Node; b: Node; t: number; speed: number; color: string };

const VIOLET = ["#8F7FFF", "#A78BFA"];
const ORANGE = ["#FFA35C", "#FF9F43"];
const LINK_DIST = 140;
const NODE_OPACITY = 0.48;
const LINE_OPACITY = 0.4;
const SPEED = 0.18;

const PULSE_OPACITY = 0.95;
const PULSE_SPEED_MIN = 0.012;
const PULSE_SPEED_MAX = 0.022;
const PULSE_TAIL_STEPS = 5;
const PULSE_TAIL_GAP = 0.035;

function nodeCountFor(width: number) {
  if (width < 640) return 22;
  if (width < 1024) return 38;
  return 56;
}

function pulseCountFor(width: number) {
  if (width < 640) return 3;
  if (width < 1024) return 5;
  return 7;
}

function createNodes(width: number, height: number, count: number): Node[] {
  return Array.from({ length: count }, () => {
    const palette = Math.random() < 0.5 ? VIOLET : ORANGE;
    const angle = Math.random() * Math.PI * 2;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: Math.cos(angle) * SPEED,
      vy: Math.sin(angle) * SPEED,
      r: 1.8 + Math.random() * 1.8,
      color: palette[Math.random() < 0.5 ? 0 : 1],
    };
  });
}

function hexToRgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

function pulseAlpha(t: number) {
  if (t < 0.12) return t / 0.12;
  if (t > 0.85) return Math.max(0, (1 - t) / 0.15);
  return 1;
}

export default function NodeField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let pulses: Pulse[] = [];
    let width = 0;
    let height = 0;
    let frameId = 0;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = createNodes(width, height, nodeCountFor(width));
      edges = [];
      pulses = [];
    }

    function computeEdges() {
      edges = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) edges.push({ a, b, dist });
        }
      }
    }

    function pulseColorFor(midX: number) {
      const palette = midX < width / 2 ? VIOLET : ORANGE;
      return palette[Math.random() < 0.5 ? 0 : 1];
    }

    function spawnPulses() {
      const target = pulseCountFor(width);
      let attempts = 0;
      while (pulses.length < target && edges.length > 0 && attempts < 20) {
        attempts++;
        const edge = edges[Math.floor(Math.random() * edges.length)];
        const duplicate = pulses.some(
          (p) => (p.a === edge.a && p.b === edge.b) || (p.a === edge.b && p.b === edge.a),
        );
        if (duplicate) continue;
        const reversed = Math.random() < 0.5;
        const from = reversed ? edge.b : edge.a;
        const to = reversed ? edge.a : edge.b;
        const midX = (edge.a.x + edge.b.x) / 2;
        pulses.push({
          a: from,
          b: to,
          t: 0,
          speed: PULSE_SPEED_MIN + Math.random() * (PULSE_SPEED_MAX - PULSE_SPEED_MIN),
          color: pulseColorFor(midX),
        });
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      for (const e of edges) {
        const { r, g, b } = hexToRgb(e.a.color);
        const alpha = (1 - e.dist / LINK_DIST) * LINE_OPACITY;
        ctx!.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.moveTo(e.a.x, e.a.y);
        ctx!.lineTo(e.b.x, e.b.y);
        ctx!.stroke();
      }

      for (const n of nodes) {
        const { r, g, b } = hexToRgb(n.color);
        ctx!.fillStyle = `rgba(${r}, ${g}, ${b}, ${NODE_OPACITY})`;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx!.fill();
      }

      // Signal pulses travelling along the existing connections, like a neural impulse.
      for (const p of pulses) {
        const { r, g, b } = hexToRgb(p.color);
        const envelope = pulseAlpha(p.t) * PULSE_OPACITY;
        const dx = p.b.x - p.a.x;
        const dy = p.b.y - p.a.y;

        for (let k = PULSE_TAIL_STEPS; k >= 1; k--) {
          const tt = p.t - k * PULSE_TAIL_GAP;
          if (tt < 0) continue;
          const tx = p.a.x + dx * tt;
          const ty = p.a.y + dy * tt;
          const tailAlpha = envelope * (1 - k / PULSE_TAIL_STEPS) * 0.6;
          ctx!.fillStyle = `rgba(${r}, ${g}, ${b}, ${tailAlpha})`;
          ctx!.beginPath();
          ctx!.arc(tx, ty, 1.6, 0, Math.PI * 2);
          ctx!.fill();
        }

        const x = p.a.x + dx * p.t;
        const y = p.a.y + dy * p.t;

        ctx!.fillStyle = `rgba(${r}, ${g}, ${b}, ${envelope * 0.35})`;
        ctx!.beginPath();
        ctx!.arc(x, y, 5, 0, Math.PI * 2);
        ctx!.fill();

        ctx!.fillStyle = `rgba(${r}, ${g}, ${b}, ${envelope})`;
        ctx!.beginPath();
        ctx!.arc(x, y, 2.6, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function step() {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x <= 0 || n.x >= width) n.vx *= -1;
        if (n.y <= 0 || n.y >= height) n.vy *= -1;
        n.x = Math.max(0, Math.min(width, n.x));
        n.y = Math.max(0, Math.min(height, n.y));
      }

      computeEdges();

      for (const p of pulses) p.t += p.speed;
      pulses = pulses.filter((p) => p.t < 1);
      spawnPulses();

      draw();
      frameId = requestAnimationFrame(step);
    }

    function render() {
      cancelAnimationFrame(frameId);
      computeEdges();
      if (reduceMotionQuery.matches) {
        pulses = [];
        draw();
      } else {
        frameId = requestAnimationFrame(step);
      }
    }

    function handleResize() {
      resize();
      render();
    }

    resize();
    render();
    window.addEventListener("resize", handleResize);
    reduceMotionQuery.addEventListener("change", render);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      reduceMotionQuery.removeEventListener("change", render);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.field} aria-hidden="true" />;
}
