export const achievementsCopy = {
  eyebrow: "/ ACHIEVEMENTS",
  headlineLead: "Recognition &",
  headlineAccent: "Milestones",
  body: "A collection of competition placements, hackathon milestones, and technical recognition that have shaped my learning journey.",
};

export type AchievementAccent = "gold" | "blue" | "violet" | "coral" | "ink" | "orange" | "emerald";

export type AchievementItem = {
  id: string;
  index: string;
  recognition: string;
  title: string;
  description: string;
  logo?: string;
  logoAlt?: string;
  logoFilter?: "invert";
  logoClass?: string;
  logoPanel?: "dark";
  caption: string[];
  accent: AchievementAccent;
  badgeIcon: "trophy" | "medal" | "star";
};

export const achievements: AchievementItem[] = [
  {
    id: "ach-codedecode",
    index: "01",
    recognition: "Runner-Up",
    title: "CodeDecode Competition",
    description: "Runner up in the IIT Bombay Techfest 2025 CodeDecode Competition",
    logo: "/achievements/techfest.png",
    logoAlt: "IIT Bombay Techfest logo",
    logoPanel: "dark",
    caption: ["Techfest", "IIT Bombay"],
    accent: "gold",
    badgeIcon: "trophy",
  },
  {
    id: "ach-appfusion",
    index: "02",
    recognition: "2nd Place",
    title: "App Fusion 2.0 Hackathon",
    description: "Secured 2nd place in the App Fusion 2.0 Hackathon.",
    logo: "/achievements/app-fusion.png",
    logoAlt: "App Fusion logo",
    caption: ["App Fusion"],
    accent: "blue",
    badgeIcon: "medal",
  },
  {
    id: "ach-nocode",
    index: "03",
    recognition: "2nd Place",
    title: "NoCode Development Workshop Competition",
    description: "Secured 2nd place in the NoCode Development Workshop Competition.",
    logo: "/achievements/sanketika-fest.png",
    logoAlt: "Sanketika Fest logo",
    caption: [],
    accent: "violet",
    badgeIcon: "medal",
  },
  {
    id: "ach-codestorm",
    index: "04",
    recognition: "3rd Place",
    title: "CodeStorm Hackathon",
    description: "Secured 3rd place in the CodeStorm Hackathon.",
    logo: "/achievements/codestorm.png",
    logoAlt: "CodeStorm logo",
    caption: ["CodeStorm"],
    accent: "coral",
    badgeIcon: "medal",
  },
  {
    id: "ach-pullshark",
    index: "05",
    recognition: "Achievement",
    title: "GitHub Pull Shark",
    description: "Recognized with the GitHub Pull Shark achievement for pull request activity and contributions.",
    logo: "/achievements/github-mark.png",
    logoAlt: "GitHub logo",
    caption: [],
    accent: "ink",
    badgeIcon: "star",
  },
  {
    id: "ach-sih",
    index: "06",
    recognition: "Shortlisted",
    title: "Smart India Hackathon (SIH)",
    description: "College-level shortlisted team (twice).",
    logo: "/achievements/sih.png",
    logoAlt: "Smart India Hackathon logo",
    logoClass: "h-12 w-12",
    caption: ["Smart India", "Hackathon"],
    accent: "orange",
    badgeIcon: "star",
  },
  {
    id: "ach-hackerrank",
    index: "07",
    recognition: "4-Star",
    title: "4-Star Java Badge",
    description: "Earned a 4-Star Java badge on HackerRank.",
    logo: "/achievements/hackerrank.png",
    logoAlt: "HackerRank logo",
    caption: ["HackerRank"],
    accent: "emerald",
    badgeIcon: "star",
  },
  {
    id: "ach-hackforge",
    index: "08",
    recognition: "Top 5",
    title: "HackForge 2.0 Hackathon",
    description: "Won 2 rounds and reached Top 5 in HackForge 2.0 Hackathon at ISL.",
    logo: "/achievements/isl.png",
    logoAlt: "ISL Engineering College logo",
    caption: ["HackForge", "2.0"],
    accent: "violet",
    badgeIcon: "medal",
  },
  {
    id: "ach-convergence",
    index: "09",
    recognition: "Top 5",
    title: "Convergence Hackathon",
    description: "Reached Top 5 in the Convergence Hackathon at VNR VJIET.",
    logo: "/achievements/vnrvjiet.png",
    logoAlt: "VNR VJIET logo",
    caption: ["VJIET"],
    accent: "blue",
    badgeIcon: "medal",
  },
];
