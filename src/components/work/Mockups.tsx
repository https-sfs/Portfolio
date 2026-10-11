import { MacDots } from "@/components/ui/MacWindow";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

function PlaceholderScreen({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const color = project.accentColor ?? "#171717";
  return (
    <div
      className={cn("relative h-full w-full overflow-hidden", className)}
      style={{
        background: `linear-gradient(160deg, ${color}33 0%, #0b1220 42%, #050608 100%)`,
      }}
    >
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,.2)_1px,transparent_0)] [background-size:16px_16px]" />
      <div className="absolute inset-x-8 top-10 h-8 rounded-full bg-white/5" />
      <div className="absolute inset-x-8 top-24 grid grid-cols-3 gap-3">
        <div className="h-20 rounded-2xl bg-white/5" />
        <div className="h-20 rounded-2xl bg-white/10" />
        <div className="h-20 rounded-2xl bg-white/5" />
      </div>
    </div>
  );
}

export function PhoneMockup({ project }: { project: Project }) {
  return (
    <div className="group-hover:-translate-y-1 relative mx-auto w-[210px] transition duration-500 sm:w-[230px] lg:w-[250px]">
      <div
        className="relative overflow-hidden rounded-[2.6rem] bg-neutral-950 shadow-floating ring-1 ring-black/20"
        style={{ aspectRatio: "507 / 1037" }}
      >
        <div className="absolute inset-[7px] overflow-hidden rounded-[2.15rem] bg-black">
          <div className="absolute left-1/2 top-3 z-20 h-[22px] w-[92px] -translate-x-1/2 rounded-full bg-black" />
          <PlaceholderScreen project={project} />
        </div>
      </div>
    </div>
  );
}

export function DesktopMockup({ project }: { project: Project }) {
  return (
    <div className="group-hover:-translate-y-1 w-full overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-card transition duration-500 dark:border-neutral-800 dark:bg-neutral-900">
      <div className="flex items-center gap-3 border-b border-neutral-200/80 px-4 py-2.5 dark:border-neutral-800">
        <MacDots />
        <div className="ml-2 flex-1 rounded-md bg-neutral-100 px-3 py-1 font-mono text-[11px] text-neutral-500 dark:bg-neutral-800">
          yoursite.dev/work/{project.slug}
        </div>
      </div>
      <div className="h-64 bg-neutral-950 sm:h-80 lg:h-[420px]">
        <PlaceholderScreen project={project} />
      </div>
    </div>
  );
}

export function CodeMockup({ project }: { project: Project }) {
  const className = project.title.replace(/\s+/g, "") + "Service";
  return (
    <div className="group-hover:-translate-y-1 overflow-hidden rounded-2xl bg-neutral-900 shadow-dark-card transition duration-500">
      <div className="mac-window-bar mac-window-bar-dark">
        <MacDots />
        <span className="ml-2 font-mono text-[11px] text-neutral-400">
          architecture_spec.py
        </span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[12px] leading-6 text-neutral-300">
        <span className="text-emerald-400">class</span> {className}
        (FastAPI):{"\n"}
        {"    "}models: [{project.technologies.slice(0, 3).join(", ")}]
      </pre>
    </div>
  );
}

export function ProjectMedia({ project }: { project: Project }) {
  if (project.mockup === "mobile") return <PhoneMockup project={project} />;
  if (project.mockup === "desktop") return <DesktopMockup project={project} />;
  return <CodeMockup project={project} />;
}
