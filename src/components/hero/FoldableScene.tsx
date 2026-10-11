"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { site } from "@/data/site";
import { featuredProjects } from "@/data/projects";

export type FoldApi = {
  setProgress: (progress: number) => void;
};

const HALF_W = 1.08;
const HALF_H = 1.78;
const DEPTH = 0.062;
const RADIUS = 0.16;

function clamp01(v: number) {
  return Math.min(1, Math.max(0, v));
}

function smoothstep(a: number, b: number, x: number) {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
}

function roundedPanel(w: number, h: number, r: number, depth: number) {
  const s = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  const geo = new THREE.ExtrudeGeometry(s, {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.01,
    bevelSize: 0.008,
    bevelSegments: 2,
    curveSegments: 10,
  });
  geo.translate(0, 0, -depth / 2);
  return geo;
}

function makeCanvas(w: number, h: number) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D unavailable");
  return { canvas, ctx };
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawLock(ctx: CanvasRenderingContext2D, time: string) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  ctx.fillStyle = "#f3f3f1";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#111";
  ctx.textAlign = "center";
  ctx.font = "600 168px Manrope, Arial, sans-serif";
  ctx.fillText(time, w / 2, 280);
  ctx.fillStyle = "#6b6b6b";
  ctx.font = "500 28px Inter, Arial, sans-serif";
  ctx.fillText(site.role, w / 2, 340);

  const cardW = w - 96;
  const cards = [
    ["Gee Cee is live", "Corporate site · now"],
    ["FoodLink — 2nd place", "App Fusion 2.0 · Flutter + Firebase"],
  ];
  cards.forEach((card, i) => {
    const y = h - 420 + i * 130;
    ctx.fillStyle = "#fff";
    roundRect(ctx, 48, y, cardW, 112, 28);
    ctx.fill();
    ctx.textAlign = "left";
    ctx.fillStyle = "#111";
    ctx.font = "600 28px Inter, Arial, sans-serif";
    ctx.fillText(card[0], 76, y + 48);
    ctx.fillStyle = "#6b6b6b";
    ctx.font = "500 22px Inter, Arial, sans-serif";
    ctx.fillText(card[1], 76, y + 82);
  });

  ctx.fillStyle = "#111";
  ctx.beginPath();
  ctx.arc(110, h - 90, 34, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(w - 110, h - 90, 34, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(w - 110, h - 90, 14, 0, Math.PI * 2);
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = "#fff";
  roundRect(ctx, w / 2 - 130, h - 124, 260, 68, 34);
  ctx.fill();
  ctx.fillStyle = "#333";
  ctx.textAlign = "center";
  ctx.font = "500 24px Inter, Arial, sans-serif";
  ctx.fillText("Scroll to unfold", w / 2, h - 80);
}

function drawHome(ctx: CanvasRenderingContext2D) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#9a9a9a";
  ctx.textAlign = "left";
  ctx.font = "500 22px Inter, Arial, sans-serif";
  ctx.fillText(site.role.toUpperCase(), 56, 80);
  ctx.fillStyle = "#111";
  ctx.font = "800 72px Manrope, Arial, sans-serif";
  ctx.fillText(site.firstName, 56, h - 280);
  ctx.fillText(site.lastName, 56, h - 200);
  ctx.fillStyle = "#666";
  ctx.font = "500 28px Inter, Arial, sans-serif";
  ctx.fillText("Web, mobile, and backend products.", 56, h - 140);
  ctx.fillStyle = "#111";
  roundRect(ctx, 56, h - 100, 220, 56, 28);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.font = "600 22px Inter, Arial, sans-serif";
  ctx.fillText("See the work  ↗", 86, h - 64);
}

function drawWork(ctx: CanvasRenderingContext2D) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  ctx.fillStyle = "#f4f4f2";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#9a9a9a";
  ctx.textAlign = "left";
  ctx.font = "500 22px Inter, Arial, sans-serif";
  ctx.fillText("SELECTED WORK", 48, 80);
  featuredProjects.slice(0, 2).forEach((project, i) => {
    const y = h - 420 + i * 190;
    ctx.fillStyle = "#fff";
    roundRect(ctx, 40, y, w - 80, 170, 28);
    ctx.fill();
    ctx.fillStyle = "#888";
    ctx.font = "500 20px Inter, Arial, sans-serif";
    ctx.fillText(`0${i + 1} / ${project.category}`, 64, y + 48);
    ctx.fillStyle = "#111";
    ctx.font = "700 32px Manrope, Arial, sans-serif";
    ctx.fillText(project.title, 64, y + 96);
    ctx.fillStyle = "#666";
    ctx.font = "500 22px Inter, Arial, sans-serif";
    ctx.fillText(project.description.slice(0, 42) + "…", 64, y + 136);
  });
}

export function FoldableScene({
  onReady,
  onFail,
  reducedMotion,
  className,
}: {
  onReady?: (api: FoldApi) => void;
  onFail?: () => void;
  reducedMotion?: boolean;
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      onFail?.();
      return;
    }

    const mobile = window.innerWidth < 768;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.35 : 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, 1, 0.05, 40);
    camera.position.set(0, 0.12, mobile ? 6.4 : 5.35);

    const frameMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#d0d1ce"),
      metalness: 0.72,
      roughness: 0.28,
      clearcoat: 0.55,
      clearcoatRoughness: 0.22,
    });

    const lock = makeCanvas(768, 1280);
    const home = makeCanvas(768, 1280);
    const work = makeCanvas(768, 1280);
    const now = () =>
      new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    drawLock(lock.ctx, now());
    drawHome(home.ctx);
    drawWork(work.ctx);

    const lockTex = new THREE.CanvasTexture(lock.canvas);
    const homeTex = new THREE.CanvasTexture(home.canvas);
    const workTex = new THREE.CanvasTexture(work.canvas);
    lockTex.colorSpace = THREE.SRGBColorSpace;
    homeTex.colorSpace = THREE.SRGBColorSpace;
    workTex.colorSpace = THREE.SRGBColorSpace;

    const device = new THREE.Group();
    scene.add(device);

    const leftPivot = new THREE.Group();
    const rightPivot = new THREE.Group();
    device.add(leftPivot, rightPivot);

    const leftFrame = new THREE.Mesh(roundedPanel(HALF_W, HALF_H, RADIUS, DEPTH), frameMat);
    leftFrame.position.x = -HALF_W / 2;
    leftPivot.add(leftFrame);

    const rightFrame = new THREE.Mesh(roundedPanel(HALF_W, HALF_H, RADIUS, DEPTH), frameMat);
    rightFrame.position.x = HALF_W / 2;
    rightPivot.add(rightFrame);

    const screenW = HALF_W - 0.1;
    const screenH = HALF_H - 0.1;
    const homeScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(screenW, screenH),
      new THREE.MeshBasicMaterial({ map: homeTex }),
    );
    homeScreen.position.set(-HALF_W / 2, 0, DEPTH / 2 + 0.002);
    leftPivot.add(homeScreen);

    const lockScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(screenW, screenH),
      new THREE.MeshBasicMaterial({ map: lockTex }),
    );
    lockScreen.position.set(-HALF_W / 2, 0, -(DEPTH / 2 + 0.002));
    lockScreen.rotation.y = Math.PI;
    leftPivot.add(lockScreen);

    const workScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(screenW, screenH),
      new THREE.MeshBasicMaterial({ map: workTex }),
    );
    workScreen.position.set(HALF_W / 2, 0, DEPTH / 2 + 0.002);
    rightPivot.add(workScreen);

    const hinge = new THREE.Mesh(
      new THREE.CylinderGeometry(0.018, 0.018, HALF_H - 0.28, 20),
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#b8b9b6"),
        metalness: 0.8,
        roughness: 0.3,
      }),
    );
    device.add(hinge);

    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(4.2, 1.4),
      new THREE.MeshBasicMaterial({
        color: 0x000000,
        transparent: true,
        opacity: 0.14,
        depthWrite: false,
      }),
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -HALF_H / 2 - 0.08;
    scene.add(shadow);

    scene.add(new THREE.HemisphereLight("#ffffff", "#c5c6c3", 1.1));
    const key = new THREE.DirectionalLight("#ffffff", 2.4);
    key.position.set(2.4, 4.2, 5.2);
    const fill = new THREE.DirectionalLight("#f3f3f1", 0.7);
    fill.position.set(-3.2, 1.4, 2.4);
    scene.add(key, fill);

    const clock = { last: "" };
    const applyProgress = (progress: number) => {
      const p = clamp01(progress);
      const unfold = smoothstep(0.04, 0.58, p);
      const angle = THREE.MathUtils.lerp(Math.PI - 0.04, 0, unfold);
      leftPivot.rotation.set(0, angle, 0);
      rightPivot.rotation.set(0, 0, 0);
      device.position.set(THREE.MathUtils.lerp(-HALF_W / 2, 0, unfold), 0.04, 0);
      device.rotation.set(
        THREE.MathUtils.lerp(0.08, 0, unfold),
        THREE.MathUtils.lerp(mobile ? 0 : -0.16, 0, unfold),
        0,
      );
      device.scale.setScalar(mobile ? THREE.MathUtils.lerp(0.92, 0.78, unfold) : 1);

      camera.position.set(0, 0.1, THREE.MathUtils.lerp(mobile ? 6.2 : 5.2, mobile ? 5.4 : 4.35, unfold));
      camera.lookAt(0, 0, 0);
      shadow.scale.set(THREE.MathUtils.lerp(0.55, 1.15, unfold), 1, 1);
      shadow.material.opacity = THREE.MathUtils.lerp(0.18, 0.1, unfold);

      const time = now();
      if (time !== clock.last) {
        clock.last = time;
        drawLock(lock.ctx, time);
        lockTex.needsUpdate = true;
      }
    };

    onReady?.({ setProgress: applyProgress });
    applyProgress(reducedMotion ? 0.82 : 0);

    const setSize = () => {
      const width = host.clientWidth || 1;
      const height = host.clientHeight || 1;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    setSize();

    let frame = 0;
    const tick = () => {
      frame = requestAnimationFrame(tick);
      renderer.render(scene, camera);
    };
    tick();

    const resize = new ResizeObserver(setSize);
    resize.observe(host);

    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      renderer.dispose();
      lockTex.dispose();
      homeTex.dispose();
      workTex.dispose();
      frameMat.dispose();
      if (renderer.domElement.parentElement === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, [onReady, onFail, reducedMotion]);

  return <div ref={hostRef} className={className} />;
}
