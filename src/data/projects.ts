export type ProjectLinks = {
  github?: string;
  backend?: string;
  frontend?: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  highlightTag: string;
  featured: boolean;
  role: string;
  description: string;
  shortDescription: string;
  longDescription: string;
  systemOverview?: string;
  challenge?: string;
  solution?: string;
  achievements: string[];
  technologies: string[];
  accentColor?: string;
  mockup: "mobile" | "desktop" | "code";
  links: ProjectLinks;
};

export const projects: Project[] = [
  {
    slug: "gee-cee-supplements",
    title: "Gee Cee Supplements",
    category: "Web",
    highlightTag: "Corporate Website",
    featured: true,
    role: "Frontend Developer",
    description:
      "Corporate website for Gee Cee, built with React, Vite, Tailwind CSS, and GSAP.",
    shortDescription:
      "A scroll-driven corporate marketing site with a React and Vite frontend, Tailwind styling, and GSAP motion.",
    longDescription:
      "Corporate website built with React, Vite, Tailwind CSS, and GSAP.",
    systemOverview:
      "A public-facing corporate website presenting Gee Cee's brand and product systems through a React frontend.",
    achievements: ["Implemented with React, Vite, Tailwind CSS, and GSAP."],
    technologies: ["React", "Vite", "Tailwind CSS", "GSAP"],
    accentColor: "#10b981",
    mockup: "desktop",
    links: { frontend: "https://gee-cee-supplements-website.vercel.app/" },
  },
  {
    slug: "hackprix-organizer",
    title: "HackPrix Organizer App",
    category: "Mobile",
    highlightTag: "Event Operations",
    featured: true,
    role: "Mobile Developer",
    description:
      "Organizer application for HackPrix, built with Flutter and Firebase.",
    shortDescription:
      "A Flutter and Firebase app used to organize HackPrix event operations.",
    longDescription:
      "HackPrix Organizer App built with Flutter and Firebase.",
    achievements: ["Built with Flutter and Firebase."],
    technologies: ["Flutter", "Firebase"],
    accentColor: "#3b82f6",
    mockup: "mobile",
    links: { frontend: "https://hackprix-checkin.web.app/" },
  },
  {
    slug: "foodlink",
    title: "FoodLink",
    category: "Mobile",
    highlightTag: "App Fusion 2.0 — 2nd Place",
    featured: true,
    role: "Mobile Developer",
    description:
      "Food donation platform built with Flutter and Firebase. Second place at App Fusion 2.0.",
    shortDescription:
      "A Flutter and Firebase food donation platform, awarded second place at App Fusion 2.0.",
    longDescription:
      "Food donation platform built with Flutter and Firebase; second place at App Fusion 2.0.",
    achievements: [
      "Built with Flutter and Firebase.",
      "Second place at App Fusion 2.0.",
    ],
    technologies: ["Flutter", "Firebase"],
    accentColor: "#f59e0b",
    mockup: "mobile",
    links: {},
  },
  {
    slug: "chocolate-factory",
    title: "Chocolate Factory",
    category: "Backend",
    highlightTag: "Management System",
    featured: true,
    role: "Backend Developer",
    description:
      "Smart chocolate management system using Java, Spring Boot, and MySQL.",
    shortDescription:
      "A Java Spring Boot and MySQL system for managing chocolate factory operations.",
    longDescription:
      "Smart chocolate management system using Java, Spring Boot, and MySQL.",
    achievements: ["Implemented with Java, Spring Boot, and MySQL."],
    technologies: ["Java", "Spring Boot", "MySQL"],
    accentColor: "#7c3aed",
    mockup: "code",
    links: {},
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export const workFilters = [
  "All",
  ...new Set(featuredProjects.map((project) => project.category)),
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return projects[0];
  return projects[(index + 1) % projects.length];
}

export function stackCore(project: Project) {
  return project.technologies.slice(0, 2).join(" & ");
}
