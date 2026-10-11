import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MacWindowProps = {
  filename?: string;
  dark?: boolean;
  className?: string;
  barClassName?: string;
  children: ReactNode;
};

export function MacDots() {
  return (
    <>
      <span className="mac-window-dot bg-[#ff5f57]" />
      <span className="mac-window-dot bg-[#febc2e]" />
      <span className="mac-window-dot bg-[#28c840]" />
    </>
  );
}

export function MacWindow({
  filename,
  dark,
  className,
  barClassName,
  children,
}: MacWindowProps) {
  return (
    <div className={cn("mac-window", className)}>
      <div
        className={cn(
          "mac-window-bar",
          dark && "mac-window-bar-dark",
          barClassName,
        )}
      >
        <MacDots />
        {filename ? (
          <span
            className={cn(
              "ml-2 font-mono text-[11px] tracking-wide",
              dark ? "text-neutral-400" : "text-neutral-500",
            )}
          >
            {filename}
          </span>
        ) : null}
      </div>
      {children}
    </div>
  );
}
