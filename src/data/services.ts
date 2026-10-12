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
    title: "WEB EXPERIENCES & FRONTEND ENGINEERING",
    filename: "web-experiences.service.ts",
    description:
      "Building responsive websites and interactive digital experiences that combine thoughtful interface design, reusable components, and purposeful motion.",
    whatIBuild:
      "Responsive page layouts, reusable UI components, interactive landing pages, animation sequences, and frontend integrations designed around clear user journeys.",
    technologies: ["React", "TypeScript", "JavaScript", "Vite", "Tailwind CSS", "GSAP"],
    useCases:
      "Gee Cee Supplements — immersive website visuals and GSAP motion; GenZrix — web product development; FoodLink — a React-based food redistribution platform.",
  },
  {
    id: "mobile-apps",
    index: "02",
    title: "MOBILE APPLICATION DEVELOPMENT",
    filename: "mobile-apps.service.ts",
    description:
      "Developing cross-platform mobile applications with practical navigation, clear user flows, and features built around real event and community needs.",
    whatIBuild:
      "Mobile interfaces, event information flows, seat allocation experiences, announcements, and application workflows designed to make essential tasks easier to complete.",
    technologies: ["Flutter", "Dart", "Firebase"],
    useCases:
      "HackPrix Organizer App — participant information, seat allocation, schedules, announcements, and event operations.",
  },
  {
    id: "backend-systems",
    index: "03",
    title: "BACKEND, APIs & DATA SYSTEMS",
    filename: "backend-systems.service.ts",
    description:
      "Building application logic, API-driven workflows, and data-backed systems that support structured operations, analysis, and reliable information management.",
    whatIBuild:
      "Backend services, API integrations, data persistence, structured investigation workflows, and management-system logic grounded in the requirements of each project.",
    technologies: ["Java", "Spring Boot", "Python", "FastAPI", "SQLite", "REST APIs"],
    useCases:
      "RIXO — risk-intelligence analysis, structured investigation workflows, and an auditable approval process; Chocolate Factory — a Java and Spring Boot management system.",
  },
  {
    id: "product-delivery",
    index: "04",
    title: "SYSTEMS ENGINEERING & PRODUCT INTEGRATION",
    filename: "systems-engineering.service.ts",
    description:
      "Bringing interfaces, application logic, external services, and hardware prototypes together to turn project requirements into working, demonstrable solutions.",
    whatIBuild:
      "End-to-end project workflows, connected application components, third-party service integrations, prototype development, and practical validation of complete user journeys.",
    technologies: [
      "React",
      "Flutter",
      "Java",
      "Spring Boot",
      "Firebase",
      "Supabase",
      "Arduino",
      "C/C++",
    ],
    useCases:
      "GenZrix — web product development; HackPrix — event application workflows; FoodLink — community food redistribution; NiGAH — an assistive-technology prototype using Arduino and sensors.",
  },
];
