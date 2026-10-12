"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export type ShowcaseClip = {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
};

type ShowcaseVideoProps = {
  src: string;
  poster: string;
  title: string;
  clip?: ShowcaseClip;
  sizes?: string;
};

function pct(value: number) {
  return `${(value * 100).toFixed(4)}%`;
}

function clipStyle(clip?: ShowcaseClip): React.CSSProperties {
  const top = clip?.top ?? 0;
  const right = clip?.right ?? 0;
  const bottom = clip?.bottom ?? 0;
  const left = clip?.left ?? 0;
  const style: React.CSSProperties & { objectViewBox?: string } = {
    objectFit: "cover",
    objectPosition: "top center",
  };

  if (top || right || bottom || left) {
    style.objectViewBox = `inset(${pct(top)} ${pct(right)} ${pct(bottom)} ${pct(left)})`;
  }

  return style;
}

async function playSafe(video: HTMLVideoElement, onBlocked: () => void) {
  try {
    video.muted = true;
    video.defaultMuted = true;
    await video.play();
  } catch (error) {
    const name = error instanceof DOMException ? error.name : "";
    if (name === "AbortError") return;
    onBlocked();
  }
}

export function ShowcaseVideo({
  src,
  poster,
  title,
  clip,
  sizes = "(max-width: 1023px) 92vw, 58vw",
}: ShowcaseVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const visibleRef = useRef(false);
  const [load, setLoad] = useState(false);
  const [staticOnly, setStaticOnly] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      const reduced = motion.matches;
      setStaticOnly(reduced);
      if (reduced) {
        setLoad(false);
        setPlaying(false);
        videoRef.current?.pause();
      }
    };

    apply();
    motion.addEventListener("change", apply);
    return () => motion.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || staticOnly) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) setLoad(true);

        const video = videoRef.current;
        if (!video) return;

        if (entry.isIntersecting) {
          void playSafe(video, () => setStaticOnly(true));
        } else {
          video.pause();
        }
      },
      { threshold: 0.35, rootMargin: "120px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [staticOnly]);

  useEffect(() => {
    if (!load || staticOnly) return;

    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    let cancelled = false;
    const start = () => {
      if (cancelled || !visibleRef.current) return;
      void playSafe(video, () => {
        if (!cancelled) setStaticOnly(true);
      });
    };

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) start();
    else video.addEventListener("canplay", start);

    return () => {
      cancelled = true;
      video.removeEventListener("canplay", start);
      video.pause();
    };
  }, [load, src, staticOnly]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <Image
        src={poster}
        alt=""
        fill
        unoptimized
        sizes={sizes}
        className="object-cover object-top"
      />
      {load && !staticOnly ? (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          poster={poster}
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          aria-hidden
          tabIndex={-1}
          title={title}
          className={`pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-300 ${
            playing ? "opacity-100" : "opacity-0"
          }`}
          style={clipStyle(clip)}
          onPlaying={() => setPlaying(true)}
          onError={() => setStaticOnly(true)}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
