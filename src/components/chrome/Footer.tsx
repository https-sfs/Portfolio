import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200/80 px-4 py-8 sm:px-6 md:px-12 dark:border-neutral-800">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 text-sm text-neutral-500 sm:flex-row sm:items-center dark:text-neutral-400">
        <p>{site.footerLeft}</p>
        <p>{site.footerRight}</p>
      </div>
    </footer>
  );
}
