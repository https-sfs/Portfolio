export const skillGroups = [
  {
    category: "Frontend",
    tint: "emerald",
    items: ["React", "Vite", "Tailwind CSS", "GSAP", "JavaScript", "HTML", "CSS"],
  },
  {
    category: "Mobile",
    tint: "sky",
    items: ["Flutter", "Firebase", "Dart"],
  },
  {
    category: "Backend",
    tint: "purple",
    items: ["Java", "Spring Boot", "MySQL"],
  },
  {
    category: "Practice",
    tint: "amber",
    items: ["Responsive UI", "Scroll motion", "Component systems"],
  },
  {
    category: "Tools",
    tint: "neutral",
    items: ["Git", "VS Code", "Android Studio"],
  },
];

export const skillMeta = {
  filename: "tech_stack.config.ts",
  title: "Technical Tooling & Ecosystem",
  count: `${skillGroups.reduce((sum, group) => sum + group.items.length, 0)} tools · ${skillGroups.length} domains`,
};
