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
  image?: string;
  imageFit?: "cover" | "contain";
  cardTitle?: string;
  cardCategory?: string;
  cardDescription?: string;
  cardTechnologies?: string[];
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
    image: "/work/gee-cee.jpg",
    imageFit: "cover",
    cardCategory: "Web / Interactive Experience",
    cardDescription:
      "Designed and developed a 3D-style landing page for Gee Cee Supplements, combining immersive visual storytelling, smooth GSAP animations, and a responsive interface to create a distinctive brand experience.",
    cardTechnologies: ["React", "Vite", "Tailwind CSS", "GSAP"],
    links: { frontend: "https://gee-cee-supplements-website.vercel.app/" },
  },
  {
    slug: "hackprix-organizer",
    title: "HackPrix Organizer / Check-in App",
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
    image: "/work/hackprix.jpg",
    imageFit: "contain",
    cardCategory: "Mobile / Event Technology",
    cardDescription:
      "Built an event companion and organizer application for HackPrix, bringing participant information, seat allocation, announcements, schedules, and event updates into one streamlined experience.",
    cardTechnologies: ["Flutter", "Dart", "Firebase"],
    links: { frontend: "https://hackprix-checkin.web.app/" },
  },
  {
    slug: "rixo",
    title: "RIXO — Fraud Detection Dashboard",
    category: "Web",
    highlightTag: "IEEE-CIS",
    featured: true,
    role: "Developer",
    description:
      "Fraud-detection dashboard for historical e-commerce analysis on public IEEE-CIS data.",
    shortDescription:
      "A RIXO dashboard for IEEE-CIS fraud detection on public transaction tables.",
    longDescription:
      "RIXO dashboard for IEEE-CIS fraud detection. Historical e-commerce fraud analysis on public IEEE-CIS tables, with simulated action only.",
    achievements: [
      "Dashboard for IEEE-CIS fraud detection on public transaction data.",
    ],
    technologies: [],
    accentColor: "#2563eb",
    mockup: "desktop",
    image: "/work/rixo.jpg",
    imageFit: "cover",
    cardTitle: "RIXO — Fraud Detection & Risk Intelligence",
    cardCategory: "AI / Risk Intelligence",
    cardDescription:
      "Developed a risk intelligence platform that detects suspicious transaction patterns, supports structured investigations and risk decisions, and maintains a persistent approval and audit trail. Integrated Razorpay Test Mode into a controlled simulation workflow, with human approval and no real-money execution.",
    cardTechnologies: [
      "Python",
      "FastAPI",
      "SQLite",
      "Machine Learning",
      "React",
      "scikit-learn",
      "Razorpay Test API",
    ],
    links: { frontend: "https://rixo-risk-intelligence.vercel.app/" },
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
    image: "/work/foodlink.jpg",
    imageFit: "contain",
    cardCategory: "Web / Social Impact",
    cardDescription:
      "Developed a community-focused food redistribution platform that connects food donors, NGOs, and communities, helping coordinate surplus food sharing through accessible interfaces and NGO partnership workflows.",
    cardTechnologies: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "shadcn/ui",
      "Supabase",
    ],
    links: { frontend: "https://foodlink-hazel-eta.vercel.app/" },
  },
  {
    slug: "genzrix",
    title: "GenZrix",
    category: "Web",
    highlightTag: "Website",
    featured: true,
    role: "Frontend Developer",
    description:
      "Website built with HTML, CSS, and JavaScript.",
    shortDescription:
      "A website built with HTML, CSS, and JavaScript.",
    longDescription:
      "Website built with HTML, CSS, and JavaScript.",
    achievements: ["Implemented with HTML, CSS, and JavaScript."],
    technologies: ["HTML", "CSS", "JavaScript"],
    accentColor: "#111111",
    mockup: "desktop",
    image: "/work/genzrix.jpg",
    imageFit: "cover",
    cardTitle: "GenZrix Website",
    cardCategory: "Web / Digital Products",
    cardDescription:
      "Contributed to the GenZrix digital presence by developing interactive web experiences, refining responsive layouts, and implementing scroll-driven animations for a polished, modern interface.",
    cardTechnologies: ["React", "TypeScript", "Vite", "GSAP", "Supabase"],
    links: { frontend: "https://www.genzrix.com/" },
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
    image: "/work/chocolate-factory.jpg",
    imageFit: "contain",
    cardCategory: "Backend / Full-Stack Application",
    cardDescription:
      "Developed a chocolate factory management application with backend services for managing chocolate products, factory operations, and orders, using structured application logic and REST APIs.",
    cardTechnologies: ["Java", "Spring Boot", "REST API"],
    links: {},
  },
  {
    slug: "nigah",
    title: "NIGAH",
    category: "Assistive Technology",
    highlightTag: "Final-year project",
    featured: true,
    role: "Developer",
    description:
      "Final-year assistive-technology project.",
    shortDescription:
      "Final-year assistive-technology project.",
    longDescription:
      "Final-year assistive-technology project. Implementation details beyond this description are not documented in the current portfolio files.",
    achievements: ["Documented in this portfolio as a final-year assistive-technology project."],
    technologies: [],
    accentColor: "#44403c",
    mockup: "code",
    image: "/work/nigah.jpg",
    imageFit: "contain",
    cardTitle: "NiGAH",
    cardCategory: "IoT / Embedded Systems",
    cardDescription:
      "Developing a low-cost assistive mobility prototype for visually impaired users, exploring obstacle detection and voice-based guidance through sensors and embedded hardware.",
    cardTechnologies: ["Arduino", "C/C++", "Ultrasonic Sensor", "Embedded Systems"],
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
