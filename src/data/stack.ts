export type SkillGroup = {
  category: string;
  tint: "emerald" | "sky" | "purple" | "amber" | "neutral";
  items: string[];
  groups?: { label: string; items: string[] }[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    tint: "emerald",
    items: ["React", "TypeScript", "Vite", "Tailwind CSS", "GSAP", "shadcn/ui"],
  },
  {
    category: "Mobile Development",
    tint: "sky",
    items: ["Flutter", "Dart", "Firebase"],
  },
  {
    category: "Backend & Data",
    tint: "purple",
    items: [
      "Java",
      "Spring Boot",
      "REST API",
      "Python",
      "FastAPI",
      "SQLite",
      "Supabase",
      "Machine Learning",
    ],
  },
  {
    category: "Embedded Systems & IoT",
    tint: "amber",
    items: ["Arduino", "C/C++", "Ultrasonic Sensors", "Embedded Systems"],
  },
  {
    category: "Tools & Engineering Practice",
    tint: "neutral",
    items: [
      "Git",
      "VS Code",
      "Android Studio",
      "Responsive UI",
      "Scroll-driven Motion",
      "Component Systems",
    ],
    groups: [
      { label: "Tools", items: ["Git", "VS Code", "Android Studio"] },
      {
        label: "Practice",
        items: ["Responsive UI", "Scroll-driven Motion", "Component Systems"],
      },
    ],
  },
];

export const skillMeta = {
  filename: "tech_stack.config.ts",
  title: "Technical Tooling & Ecosystem",
  count: `${skillGroups.reduce((sum, group) => sum + group.items.length, 0)} tools · ${skillGroups.length} domains`,
};
