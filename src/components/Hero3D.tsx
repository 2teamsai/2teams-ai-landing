"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import styles from "./Hero3D.module.css";

type Point2D = { x: number; y: number };
type BrainAnchor = { c1?: Point2D; c2?: Point2D; p: Point2D };

const BRAIN_ANCHORS: BrainAnchor[] = [
  { p: { x: -85, y: 10 } },
  { c1: { x: -95, y: -10 }, c2: { x: -85, y: -40 }, p: { x: -60, y: -45 } },
  { c1: { x: -65, y: -65 }, c2: { x: -35, y: -70 }, p: { x: -20, y: -55 } },
  { c1: { x: -10, y: -75 }, c2: { x: 15, y: -75 }, p: { x: 25, y: -58 } },
  { c1: { x: 45, y: -68 }, c2: { x: 75, y: -55 }, p: { x: 75, y: -30 } },
  { c1: { x: 95, y: -25 }, c2: { x: 95, y: 5 }, p: { x: 78, y: 15 } },
  { c1: { x: 92, y: 30 }, c2: { x: 82, y: 55 }, p: { x: 60, y: 55 } },
  { c1: { x: 58, y: 68 }, c2: { x: 46, y: 78 }, p: { x: 40, y: 82 } },
  { c1: { x: 34, y: 86 }, c2: { x: 52, y: 92 }, p: { x: 54, y: 106 } },
  { c1: { x: 56, y: 118 }, c2: { x: 38, y: 124 }, p: { x: 28, y: 114 } },
  { c1: { x: 20, y: 106 }, c2: { x: 15, y: 90 }, p: { x: 15, y: 68 } },
  { c1: { x: 0, y: 80 }, c2: { x: -25, y: 78 }, p: { x: -32, y: 62 } },
  { c1: { x: -55, y: 70 }, c2: { x: -80, y: 55 }, p: { x: -82, y: 32 } },
  { c1: { x: -95, y: 28 }, c2: { x: -95, y: 15 }, p: { x: -85, y: 10 } },
];

function cubicPoint(p0: Point2D, p1: Point2D, p2: Point2D, p3: Point2D, t: number): Point2D {
  const mt = 1 - t;
  return {
    x: mt * mt * mt * p0.x + 3 * mt * mt * t * p1.x + 3 * mt * t * t * p2.x + t * t * t * p3.x,
    y: mt * mt * mt * p0.y + 3 * mt * mt * t * p1.y + 3 * mt * t * t * p2.y + t * t * t * p3.y,
  };
}

function buildBrainPolygon(): Point2D[] {
  const polygon: Point2D[] = [];
  for (let s = 1; s < BRAIN_ANCHORS.length; s++) {
    const p0 = BRAIN_ANCHORS[s - 1].p;
    const { c1, c2, p } = BRAIN_ANCHORS[s];
    if (!c1 || !c2) continue;
    for (let t = 0; t < 1; t += 1 / 16) polygon.push(cubicPoint(p0, c1, c2, p, t));
  }
  return polygon;
}

function pointInPolygon(polygon: Point2D[], x: number, y: number): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;
    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

export default function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const brainPolygon = buildBrainPolygon();
    let bMinX = Infinity;
    let bMaxX = -Infinity;
    let bMinY = Infinity;
    let bMaxY = -Infinity;
    brainPolygon.forEach((pt) => {
      if (pt.x < bMinX) bMinX = pt.x;
      if (pt.x > bMaxX) bMaxX = pt.x;
      if (pt.y < bMinY) bMinY = pt.y;
      if (pt.y > bMaxY) bMaxY = pt.y;
    });
    const bCx = (bMinX + bMaxX) / 2;
    const bCy = (bMinY + bMaxY) / 2;
    const bHalfW = (bMaxX - bMinX) / 2;
    const bHalfH = (bMaxY - bMinY) / 2;

    const SCALE = 5.7 / (bMaxX - bMinX);
    const Z_DEPTH = 1.85;

    function lensZ(x: number, y: number) {
      const nx = (x - bCx) / bHalfW;
      const ny = (y - bCy) / bHalfH;
      const localSq = 1 - (nx * nx + ny * ny);
      return Math.sqrt(Math.max(0, localSq));
    }

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0.55, 11.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const disposables: { geometry: THREE.BufferGeometry; material: THREE.Material }[] = [];

    function buildBrain(colorHex: number, offsetX: number, seed: number, mirror: boolean) {
      const brainGroup = new THREE.Group();
      const color = new THREE.Color(colorHex);
      const nodeCandidates: THREE.Vector3[] = [];
      const flip = mirror ? -1 : 1;

      const fillTarget = 2600;
      const fillPts: Point2D[] = [];
      let attempts = 0;
      while (fillPts.length < fillTarget && attempts < fillTarget * 8) {
        attempts++;
        const x = bMinX + Math.random() * (bMaxX - bMinX);
        const y = bMinY + Math.random() * (bMaxY - bMinY);
        if (pointInPolygon(brainPolygon, x, y)) fillPts.push({ x, y });
      }

      const rimPts: { x: number; y: number; layer: number }[] = [];
      const rimLayers = [-0.65, 0, 0.65];
      rimLayers.forEach((lz) => {
        brainPolygon.forEach((pt) => rimPts.push({ x: pt.x, y: pt.y, layer: lz }));
      });

      const total = fillPts.length + rimPts.length;
      const positions = new Float32Array(total * 3);
      const colors = new Float32Array(total * 3);
      let idx = 0;

      fillPts.forEach((pt) => {
        const amt = lensZ(pt.x, pt.y);
        const worldX = (pt.x - bCx) * SCALE * flip;
        const worldY = -(pt.y - bCy) * SCALE;
        const worldZ = (Math.random() * 2 - 1) * Z_DEPTH * amt;
        positions[idx * 3] = worldX;
        positions[idx * 3 + 1] = worldY;
        positions[idx * 3 + 2] = worldZ;
        const shade = 0.9 + Math.random() * 0.2;
        colors[idx * 3] = Math.min(1, color.r * shade);
        colors[idx * 3 + 1] = Math.min(1, color.g * shade);
        colors[idx * 3 + 2] = Math.min(1, color.b * shade);
        if (idx % 26 === 0) nodeCandidates.push(new THREE.Vector3(worldX, worldY, worldZ));
        idx++;
      });

      rimPts.forEach((pt) => {
        const amt = lensZ(pt.x, pt.y);
        const worldX = (pt.x - bCx) * SCALE * flip;
        const worldY = -(pt.y - bCy) * SCALE;
        const worldZ = pt.layer * Z_DEPTH * amt + (Math.random() - 0.5) * 0.05;
        positions[idx * 3] = worldX;
        positions[idx * 3 + 1] = worldY;
        positions[idx * 3 + 2] = worldZ;
        const shade = 1.0 + Math.random() * 0.15;
        colors[idx * 3] = Math.min(1, color.r * shade);
        colors[idx * 3 + 1] = Math.min(1, color.g * shade);
        colors[idx * 3 + 2] = Math.min(1, color.b * shade);
        idx++;
      });

      const cloudGeo = new THREE.BufferGeometry();
      cloudGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      cloudGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      const cloudMat = new THREE.PointsMaterial({
        size: 0.026,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      brainGroup.add(new THREE.Points(cloudGeo, cloudMat));
      disposables.push({ geometry: cloudGeo, material: cloudMat });

      const nodeArr = new Float32Array(nodeCandidates.length * 3);
      nodeCandidates.forEach((p, i) => {
        nodeArr[i * 3] = p.x;
        nodeArr[i * 3 + 1] = p.y;
        nodeArr[i * 3 + 2] = p.z;
      });
      const nodeGeo = new THREE.BufferGeometry();
      nodeGeo.setAttribute("position", new THREE.BufferAttribute(nodeArr, 3));
      const nodeMat = new THREE.PointsMaterial({
        color: colorHex,
        size: 0.075,
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
      });
      brainGroup.add(new THREE.Points(nodeGeo, nodeMat));
      disposables.push({ geometry: nodeGeo, material: nodeMat });

      const lineVerts: number[] = [];
      const maxDist = 0.9;
      for (let i = 0; i < nodeCandidates.length; i++) {
        let connections = 0;
        for (let j = i + 1; j < nodeCandidates.length; j++) {
          if (connections >= 2) break;
          if (nodeCandidates[i].distanceTo(nodeCandidates[j]) < maxDist) {
            lineVerts.push(nodeCandidates[i].x, nodeCandidates[i].y, nodeCandidates[i].z);
            lineVerts.push(nodeCandidates[j].x, nodeCandidates[j].y, nodeCandidates[j].z);
            connections++;
          }
        }
      }
      const lineGeo = new THREE.BufferGeometry();
      lineGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(lineVerts), 3));
      const lineMat = new THREE.LineBasicMaterial({ color: colorHex, transparent: true, opacity: 0.4 });
      brainGroup.add(new THREE.LineSegments(lineGeo, lineMat));
      disposables.push({ geometry: lineGeo, material: lineMat });

      brainGroup.position.x = offsetX;
      brainGroup.rotation.z = seed;
      return brainGroup;
    }

    const brainHalfWidth = bHalfW * SCALE;
    const brainGap = 0.6;
    const offsetX = brainHalfWidth + brainGap / 2;
    const brainAI = buildBrain(0x8f5cff, -offsetX, -0.06, true);
    const brainGrowth = buildBrain(0xff6b3d, offsetX, 0.06, false);
    group.add(brainAI, brainGrowth);

    const dustCount = 260;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 18;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 4;
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({ color: 0x565c72, size: 0.018, transparent: true, opacity: 0.4 });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);
    disposables.push({ geometry: dustGeo, material: dustMat });

    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth - 0.5;
      mouseY = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let swingT = 0;
    let frameId = 0;
    const SWING_AMPLITUDE = 0.12;
    const SWING_SPEED = 0.012;
    function animate() {
      frameId = requestAnimationFrame(animate);
      swingT += SWING_SPEED;
      const autoSwing = Math.sin(swingT) * SWING_AMPLITUDE;
      group.rotation.y = autoSwing + mouseX * 0.25;
      group.rotation.x += (mouseY * 0.18 - group.rotation.x) * 0.07;
      dust.rotation.y += 0.0003;
      renderer.render(scene, camera);
    }
    animate();

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      disposables.forEach(({ geometry, material }) => {
        geometry.dispose();
        material.dispose();
      });
      renderer.dispose();
      if (renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className={styles.mount} />;
}
