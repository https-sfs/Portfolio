export type Service = {
  id: string;
  index: string;
  title: string;
  filename: string;
  description: string;
  whatIBuild: string;
  technologies: string[];
  useCases: string;
};

export const services: Service[] = [
  {
    id: "interactive-web",
    index: "01",
    title: "INTERACTIVE WEB EXPERIENCES",
    filename: "interactive-web.service.ts",
    description:
      "Building corporate and product websites with React, Vite, Tailwind CSS, and scroll-driven GSAP motion.",
    whatIBuild:
      "Marketing sites, landing sequences, and component systems with intentional motion and a clear visual hierarchy.",
    technologies: ["React", "Vite", "Tailwind CSS", "GSAP"],
    useCases: "Corporate websites such as Gee Cee Supplements.",
  },
  {
    id: "mobile-apps",
    index: "02",
    title: "MOBILE APPLICATION DEVELOPMENT",
    filename: "mobile-apps.service.ts",
    description:
      "Shipping Flutter applications with Firebase for event operations and community products.",
    whatIBuild:
      "Cross-platform mobile apps with authentication, live data, and practical organizer or donor workflows.",
    technologies: ["Flutter", "Firebase"],
    useCases: "HackPrix Organizer App and FoodLink.",
  },
  {
    id: "backend-systems",
    index: "03",
    title: "BACKEND & DATA SYSTEMS",
    filename: "backend-systems.service.ts",
    description:
      "Designing application backends with Java, Spring Boot, and relational data in MySQL.",
    whatIBuild:
      "Service layers, persistence models, and management workflows for operational products.",
    technologies: ["Java", "Spring Boot", "MySQL"],
    useCases: "Chocolate Factory management system.",
  },
  {
    id: "product-delivery",
    index: "04",
    title: "PRODUCT DELIVERY",
    filename: "product-delivery.service.ts",
    description:
      "Taking an idea from structure to a working interface, whether that is a website, a mobile app, or a management backend.",
    whatIBuild:
      "End-to-end student and competition products with a focus on clarity, usable flows, and a finished presentation.",
    technologies: ["React", "Flutter", "Spring Boot", "Firebase"],
    useCases: "Hackathon delivery, including FoodLink at App Fusion 2.0.",
  },
];
