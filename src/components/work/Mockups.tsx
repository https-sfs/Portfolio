import Image from "next/image";
import { MacDots } from "@/components/ui/MacWindow";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

function DeviceFallback({ project }: { project: Project }) {
  return (
    <div
      className="work-device-fallback"
      style={{ ["--accent" as string]: project.accentColor ?? "#111" }}
    >
      <span>{project.category}</span>
      <strong>{project.title}</strong>
    </div>
  );
}

function Screen({ project }: { project: Project }) {
  if (!project.image) return <DeviceFallback project={project} />;

  return (
    <Image
      src={project.image}
      alt=""
      fill
      sizes="(max-width: 767px) 70vw, 420px"
      className="work-shot"
    />
  );
}

export function PhoneMockup({ project }: { project: Project }) {
  return (
    <div className="work-device work-device-phone">
      <div className="work-phone-shell">
        <div className="work-phone-screen">
          <span className="work-phone-notch" aria-hidden />
          <Screen project={project} />
        </div>
      </div>
    </div>
  );
}

export function DesktopMockup({ project }: { project: Project }) {
  const url = project.links.frontend?.replace(/^https?:\/\//, "");

  return (
    <div className="work-device work-device-browser">
      <div className="work-browser-bar">
        <MacDots />
        <span className="work-browser-url">{url ?? project.title}</span>
      </div>
      <div className="work-browser-screen">
        <Screen project={project} />
      </div>
    </div>
  );
}

export function CodeMockup({ project }: { project: Project }) {
  return (
    <div className="work-device work-device-code">
      <div className="work-browser-bar">
        <MacDots />
        <span className="work-browser-url">{project.highlightTag}</span>
      </div>
      <div className="work-code-body">
        <p>{project.category}</p>
        <strong>{project.title}</strong>
        {project.technologies.length ? (
          <ul>
            {project.technologies.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}

export function ProjectMedia({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <div className={cn("work-visual", project.image && "has-shot", className)}>
      {project.mockup === "mobile" ? <PhoneMockup project={project} /> : null}
      {project.mockup === "desktop" ? <DesktopMockup project={project} /> : null}
      {project.mockup === "code" ? <CodeMockup project={project} /> : null}
    </div>
  );
}
