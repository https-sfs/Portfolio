"use client";

import { useEffect, useState } from "react";

type CursorMode = "default" | "hover" | "view" | "open";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [mode, setMode] = useState<CursorMode>("default");

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.body.classList.add("has-custom-cursor");

    const onMove = (event: PointerEvent) => {
      setPos({ x: event.clientX, y: event.clientY });
      const target = event.target as HTMLElement | null;
      if (!target) {
        setMode("default");
        return;
      }
      if (target.closest("[data-cursor='view']")) setMode("view");
      else if (target.closest("[data-cursor='open']")) setMode("open");
      else if (target.closest("a, button, [data-cursor='hover']")) setMode("hover");
      else setMode("default");
    };

    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  if (!enabled) return null;

  const label = mode === "view" ? "View" : mode === "open" ? "Open" : "";

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
      style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full border border-white/80 transition-all duration-200 ${
          mode === "default" ? "h-3 w-3 bg-white" : "h-12 w-12 bg-white/10"
        }`}
      />
      {label ? (
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-widest text-white">
          {label}
        </span>
      ) : null}
    </div>
  );
}
