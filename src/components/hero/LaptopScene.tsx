"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export type LaptopApi = {
  setProgress: (progress: number) => void;
};

const LID_CLOSED = Math.PI / 2 - 0.04;
const LID_OPEN = 0.12;

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
}

function createDellLogoTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.clearRect(0, 0, 256, 256);
  ctx.beginPath();
  ctx.arc(128, 128, 92, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(200, 205, 210, 0.88)";
  ctx.lineWidth = 10;
  ctx.stroke();
  ctx.fillStyle = "rgba(214, 218, 222, 0.95)";
  ctx.font = "800 48px Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("DELL", 128, 130);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createScreenCanvas() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 640;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D unavailable");
  return { canvas, ctx };
}

function drawScreen(
  ctx: CanvasRenderingContext2D,
  percent: number,
  reveal: number,
) {
  const w = 1024;
  const h = 640;
  ctx.fillStyle = "#050608";
  ctx.fillRect(0, 0, w, h);

  ctx.strokeStyle = "rgba(255,255,255,0.04)";
  ctx.lineWidth = 1;
  for (let i = 80; i < w; i += 80) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, h);
    ctx.stroke();
  }

  ctx.globalAlpha = reveal;
  ctx.fillStyle = "#6b7280";
  ctx.font = "600 22px Inter, Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("INITIALIZING PORTFOLIO", w / 2, 168);

  ctx.fillStyle = "#f4f4f5";
  ctx.font = "700 168px Inter, Arial, sans-serif";
  ctx.fillText(`${percent}%`, w / 2, 360);

  const barW = 420;
  const barH = 8;
  const barX = (w - barW) / 2;
  const barY = 430;
  ctx.fillStyle = "#1f2933";
  ctx.fillRect(barX, barY, barW, barH);
  ctx.fillStyle = "#10b981";
  ctx.fillRect(barX, barY, barW * (percent / 100), barH);

  if (percent >= 100) {
    ctx.fillStyle = "#34d399";
    ctx.font = "600 18px Inter, Arial, sans-serif";
    ctx.fillText("READY", w / 2, 490);
  }
  ctx.globalAlpha = 1;
}

const startCam = new THREE.Vector3(0.15, 1.85, 5.35);

export function LaptopScene({
  onReady,
  onFail,
  className,
  reducedMotion,
}: {
  onReady?: (api: LaptopApi) => void;
  onFail?: () => void;
  className?: string;
  reducedMotion?: boolean;
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
    renderer.toneMappingExposure = 1.05;
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.05, 40);
    camera.position.copy(startCam);

    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#0d0e10"),
      metalness: 0.62,
      roughness: 0.34,
      clearcoat: 0.28,
      clearcoatRoughness: 0.35,
    });
    const deckMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#141518"),
      metalness: 0.45,
      roughness: 0.42,
    });
    const keyMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#1a1c20"),
      metalness: 0.2,
      roughness: 0.55,
    });
    const padMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#0a0b0d"),
      metalness: 0.3,
      roughness: 0.28,
    });

    const laptop = new THREE.Group();
    laptop.rotation.set(0.12, -0.22, 0);
    scene.add(laptop);

    const baseGeo = new THREE.BoxGeometry(3.42, 0.1, 2.22);
    const base = new THREE.Mesh(baseGeo, bodyMat);
    base.position.y = 0.05;
    laptop.add(base);

    const deck = new THREE.Mesh(new THREE.BoxGeometry(3.22, 0.02, 2.02), deckMat);
    deck.position.y = 0.11;
    laptop.add(deck);

    const cols = mobile ? 10 : 14;
    const rows = mobile ? 4 : 5;
    const keyW = 0.16;
    const keyD = 0.16;
    const keyGeo = new THREE.BoxGeometry(keyW, 0.035, keyD);
    const keys = new THREE.InstancedMesh(keyGeo, keyMat, cols * rows);
    const dummy = new THREE.Object3D();
    const startX = -((cols - 1) * 0.2) / 2;
    const startZ = -0.22;
    let i = 0;
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        dummy.position.set(startX + c * 0.2, 0.135, startZ + r * 0.2);
        dummy.updateMatrix();
        keys.setMatrixAt(i, dummy.matrix);
        i += 1;
      }
    }
    laptop.add(keys);

    const trackpad = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.012, 0.52), padMat);
    trackpad.position.set(0, 0.122, 0.72);
    laptop.add(trackpad);

    const hinge = new THREE.Mesh(
      new THREE.CylinderGeometry(0.035, 0.035, 3.05, 16),
      bodyMat,
    );
    hinge.rotation.z = Math.PI / 2;
    hinge.position.set(0, 0.14, -1.05);
    laptop.add(hinge);

    const lidPivot = new THREE.Group();
    lidPivot.position.set(0, 0.14, -1.05);
    lidPivot.rotation.x = reducedMotion ? LID_OPEN : LID_CLOSED;
    laptop.add(lidPivot);

    const lid = new THREE.Mesh(new THREE.BoxGeometry(3.4, 2.16, 0.11), bodyMat);
    lid.position.set(0, 1.08, 0);
    lidPivot.add(lid);

    const bezel = new THREE.Mesh(
      new THREE.BoxGeometry(3.18, 1.96, 0.01),
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color("#050506"),
        metalness: 0.2,
        roughness: 0.45,
      }),
    );
    bezel.position.set(0, 1.08, 0.058);
    lidPivot.add(bezel);

    const { canvas: screenCanvas, ctx: screenCtx } = createScreenCanvas();
    drawScreen(screenCtx, reducedMotion ? 100 : 10, reducedMotion ? 1 : 0);
    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.colorSpace = THREE.SRGBColorSpace;
    const screen = new THREE.Mesh(
      new THREE.PlaneGeometry(2.98, 1.76),
      new THREE.MeshBasicMaterial({ map: screenTexture }),
    );
    screen.position.set(0, 1.1, 0.064);
    lidPivot.add(screen);

    const logoTex = createDellLogoTexture();
    const logo = new THREE.Mesh(
      new THREE.CircleGeometry(0.16, 32),
      new THREE.MeshBasicMaterial({ map: logoTex, transparent: true }),
    );
    logo.position.set(0, 1.08, -0.058);
    logo.scale.setScalar(1.35);
    logo.rotation.y = Math.PI;
    lidPivot.add(logo);

    const shadowTex = (() => {
      const c = document.createElement("canvas");
      c.width = 256;
      c.height = 256;
      const g = c.getContext("2d");
      if (g) {
        const grd = g.createRadialGradient(128, 128, 20, 128, 128, 120);
        grd.addColorStop(0, "rgba(0,0,0,0.28)");
        grd.addColorStop(1, "rgba(0,0,0,0)");
        g.fillStyle = grd;
        g.fillRect(0, 0, 256, 256);
      }
      const t = new THREE.CanvasTexture(c);
      t.colorSpace = THREE.SRGBColorSpace;
      return t;
    })();
    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(5.2, 3.6),
      new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false }),
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.001;
    scene.add(shadow);

    const hemi = new THREE.HemisphereLight("#f8fafc", "#94a3b8", 0.85);
    const key = new THREE.DirectionalLight("#ffffff", 2.15);
    key.position.set(3.4, 5.2, 4.4);
    const fill = new THREE.DirectionalLight("#e2e8f0", 0.45);
    fill.position.set(-4, 2.2, 2.2);
    const rim = new THREE.DirectionalLight("#34d399", 0.28);
    rim.position.set(-2.2, 1.4, -3);
    scene.add(hemi, key, fill, rim);

    const screenPos = new THREE.Vector3();
    const screenNormal = new THREE.Vector3();
    const look = new THREE.Vector3();
    let lastPercent = reducedMotion ? 100 : -1;

    const applyProgress = (progress: number) => {
      const p = clamp01(progress);
      const lidT = smoothstep(0.06, 0.34, p);
      lidPivot.rotation.x = THREE.MathUtils.lerp(LID_CLOSED, LID_OPEN, lidT);

      const loadT = smoothstep(0.2, 0.76, p);
      const percent = Math.round(10 + loadT * 90);
      const reveal = smoothstep(0.16, 0.28, p);
      if (percent !== lastPercent || p < 0.3) {
        lastPercent = percent;
        drawScreen(screenCtx, percent, reveal);
        screenTexture.needsUpdate = true;
      }

      screen.updateWorldMatrix(true, false);
      screen.getWorldPosition(screenPos);
      screenNormal.set(0, 0, 1).transformDirection(screen.matrixWorld);

      const approach = smoothstep(0.22, 0.82, p);
      const enter = smoothstep(0.86, 1, p);
      const startDist = mobile ? 7.1 : 6.35;
      const midDist = mobile ? 2.55 : 2.2;
      const endDist = -0.35;
      const dist = THREE.MathUtils.lerp(
        THREE.MathUtils.lerp(startDist, midDist, approach),
        endDist,
        enter,
      );
      const lift = THREE.MathUtils.lerp(1.15, 0.08, approach + enter * 0.35);

      camera.position.copy(screenPos).addScaledVector(screenNormal, dist);
      camera.position.y += lift * (1 - enter);
      if (p < 0.18) {
        startCam.set(mobile ? 0.08 : 0.15, mobile ? 2.05 : 1.85, mobile ? 6.1 : 5.35);
        camera.position.lerp(startCam, 1 - smoothstep(0, 0.18, p));
      }
      look.copy(screenPos);
      camera.lookAt(look);
      camera.fov = THREE.MathUtils.lerp(28, 36, enter);
      camera.updateProjectionMatrix();

      renderer.domElement.style.opacity = String(1 - smoothstep(0.93, 1, p));
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
      baseGeo.dispose();
      keyGeo.dispose();
      screenTexture.dispose();
      logoTex.dispose();
      shadowTex.dispose();
      bodyMat.dispose();
      deckMat.dispose();
      keyMat.dispose();
      padMat.dispose();
      if (renderer.domElement.parentElement === host) {
        host.removeChild(renderer.domElement);
      }
    };
  }, [onReady, onFail, reducedMotion]);

  return <div ref={hostRef} className={className} />;
}
