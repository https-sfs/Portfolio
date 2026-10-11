import { cn } from "@/lib/utils";

export function SectionEyebrow({
  children,
  light,
  className,
}: {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mb-4 flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest",
        light ? "text-neutral-400" : "text-neutral-500 dark:text-neutral-400",
        className,
      )}
    >
      <span
        className={cn(
          "inline-block h-2 w-2",
          light ? "bg-white" : "bg-neutral-900 dark:bg-white",
        )}
      />
      {children}
    </p>
  );
}
