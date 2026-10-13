export type ExperienceItem = {
  id: string;
  role: string;
  organization: string;
  duration: string;
  location: string;
  badge?: string;
  logo?: string;
  description: string;
  highlights: string[];
};

export const experienceCopy = {
  eyebrow: "/EDUCATION & JOURNEY",
  headline: "Education",
  badge: "Class of 2027",
  filename: "experience.log",
};

export const education: ExperienceItem[] = [
  {
    id: "exp-lords",
    role: "BE in Computer Science and Engineering",
    organization: "Lords Institute of Engineering and Technology",
    duration: "Expected 2027",
    location: "",
    badge: "In Progress",
    description:
      "Undergraduate Computer Science and Engineering degree, with project work across web, mobile, and backend systems.",
    highlights: [
      "Building product-facing software alongside coursework.",
      "Projects include Gee Cee Supplements, HackPrix Organizer App, FoodLink, and Chocolate Factory.",
    ],
  },
];

export const roles: ExperienceItem[] = [
  {
    id: "exp-genzrix",
    role: "Mobile App & Web Developer",
    organization: "GenZrix",
    duration: "May 2026 – Present",
    location: "Hyderabad · Hybrid",
    logo: "/experience/genzrix.png",
    description:
      "Developing web and mobile applications, building responsive web experiences and interactive features while contributing to product development from concept to deployment.",
    highlights: [],
  },
  {
    id: "exp-dhee",
    role: "Java Full Stack + Cloud & DevOps Intern",
    organization: "Dhee Coding Lab",
    duration: "August 2026 – Present",
    location: "Hyderabad · Remote",
    logo: "/experience/dhee.png",
    description:
      "Selected for a Java Full Stack with Cloud & DevOps internship track covering Java, data structures and algorithms, Spring Boot, SQL, frontend development, and cloud/DevOps fundamentals.",
    highlights: [],
  },
  {
    id: "exp-qveto",
    role: "Web Development Intern",
    organization: "Qveto Technologies",
    duration: "October 2026 – Present",
    location: "Hyderabad · Remote",
    logo: "/experience/qveto.png",
    description:
      "Developing responsive web interfaces with React and Next.js, including API integration, debugging, testing, and frontend improvements.",
    highlights: [],
  },
  {
    id: "exp-pentagon",
    role: "Java Full-Stack Developer Trainee",
    organization: "Pentagon Space",
    duration: "August 2026 – Present",
    location: "Hyderabad · Remote",
    logo: "/experience/pentagon.png",
    description:
      "Participating in a structured Java full-stack trainee program with technical training, practical learning, and interview preparation.",
    highlights: [],
  },
  {
    id: "exp-hackprix",
    role: "Mobile Application Developer",
    organization: "HackPrix Community",
    duration: "March 2023 – July 2026",
    location: "India · On-site · Part-time",
    logo: "/experience/hackprix.png",
    description:
      "Developed the Flutter and Firebase HackPrix Organizer App and contributed to website development, participant registration, and hackathon operations.",
    highlights: [
      "HackPrix Organizer App — Flutter and Firebase.",
      "Website, registration, and event operations support.",
    ],
  },
  {
    id: "exp-might",
    role: "Java Spring Boot Intern",
    organization: "Might IT Solutions",
    duration: "August 2025 – October 2025",
    location: "Hyderabad, Telangana · On-site",
    logo: "/experience/might-it.png",
    description:
      "Developed Java and Spring Boot backend modules, implemented REST APIs with a layered architecture, and tested endpoints in Postman.",
    highlights: [
      "REST APIs in a layered Spring Boot architecture.",
      "Endpoint testing with Postman.",
    ],
  },
];

export const experience = education;

export const contactCopy = {
  filename: "contact.sh",
  chip: "Currently Accepting New Opportunities",
  headline: "HAVE A PROJECT IN MIND?",
  body: "Let's build something useful, clear, and well made. Available for web, mobile, and backend software projects.",
};
