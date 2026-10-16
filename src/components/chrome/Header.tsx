"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navItems, navSpyIds, site } from "@/data/site";
import { scrollToId } from "@/lib/utils";

export function Header() {
  const [active, setActive] = useState("work");
  const [open, setOpen] = useState(false);
  const [navReady, setNavReady] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home");
    let ticking = false;

    const measure = () => {
      ticking = false;

      if (!hero) {
        setNavReady(true);
      } else {
        const ready = hero.getBoundingClientRect().bottom < window.innerHeight * 0.92;
        setNavReady(ready);
        if (!ready) setOpen(false);
      }

      const header = document.querySelector(".site-header");
      const spyLine = (header?.getBoundingClientRect().bottom ?? 80) + 28;
      let current: (typeof navSpyIds)[number] = navSpyIds[0];

      for (const id of navSpyIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= spyLine) current = id;
      }

      setActive(current);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const go = (id: string) => {
    setActive(id);
    setOpen(false);
    scrollToId(id);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: navReady ? 1 : 0, y: navReady ? 0 : -80 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="site-header fixed top-4 z-50 w-full px-4 sm:top-6 sm:px-6"
        aria-hidden={!navReady}
        style={{
          pointerEvents: navReady ? "auto" : "none",
          visibility: navReady ? "visible" : "hidden",
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border border-neutral-200/80 bg-white/80 px-3 py-2 shadow-subtle backdrop-blur-xl dark:border-neutral-700/50 dark:bg-neutral-900/80">
          <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 dark:bg-emerald-950/40">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="hidden text-xs font-medium text-emerald-700 min-[420px]:inline dark:text-emerald-300">
              {site.availability}
            </span>
            <span className="text-xs font-medium text-emerald-700 min-[420px]:hidden dark:text-emerald-300">
              {site.availabilityShort}
            </span>
          </div>

          <nav className="hidden items-center rounded-full bg-neutral-100/80 p-1 lg:flex dark:bg-neutral-800/80">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => go(item.id)}
                className={`rounded-full px-2.5 py-1.5 text-sm font-medium transition xl:px-3 ${
                  active === item.id
                    ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                    : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
                }`}
              >
                {item.label}
                {"badge" in item && item.badge ? (
                  <span className="ml-1 font-mono text-[10px] opacity-70">
                    [{item.badge}]
                  </span>
                ) : null}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => go("contact")}
              className="inline-flex items-center gap-1 rounded-full bg-neutral-900 px-3 py-2 text-sm font-medium text-white dark:bg-white dark:text-neutral-900"
            >
              Let&apos;s Talk
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              aria-label="Toggle Navigation Menu"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200/80 lg:hidden dark:border-neutral-700"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-neutral-950/90 backdrop-blur-xl lg:hidden"
          >
            <div className="flex h-full flex-col justify-between px-6 pb-10 pt-28">
              <div>
                <p className="mb-6 font-mono text-xs uppercase tracking-widest text-neutral-400">
                  Navigation
                </p>
                <div className="space-y-2">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => go(item.id)}
                      className="flex w-full items-center justify-between border-b border-white/10 py-4 text-left text-2xl font-display font-bold text-white"
                    >
                      {item.label}
                      {"badge" in item && item.badge ? (
                        <span className="font-mono text-sm text-neutral-400">
                          [{item.badge}]
                        </span>
                      ) : null}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2 font-mono text-sm text-neutral-400">
                <p>
                  Developer: <span className="text-white">{site.fullName}</span>
                </p>
                <p>
                  Role: <span className="text-white">{site.role}</span>
                </p>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
