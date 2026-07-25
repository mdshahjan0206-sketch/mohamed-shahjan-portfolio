/**
 * EDUCATION & JOURNEY DATA
 * 
 * All Education & Journey section content — separated from UI.
 * Source of truth: Uploaded resume (Untitled-1.html(2).pdf).
 * 
 * No professional experience. Only real education milestones
 * and academic journey from the resume.
 */

import type { ExperienceEntry } from "@/types/experience";

export const experiences: ExperienceEntry[] = [
  {
    id: "bse-cse",
    year: "2025 — Present",
    title: "B.E. Computer Science and Engineering",
    organization: "Meenakshi Sundararajan Engineering College, Chennai",
    description:
      "Currently pursuing a Bachelor of Engineering in Computer Science and Engineering. Focused on building a strong foundation in coding, problem-solving, and emerging technologies.",
    technologies: ["Python", "C", "ML Concepts"],
    status: "Ongoing",
  },
  {
    id: "hsc",
    year: "2025",
    title: "Higher Secondary Certificate (Class XII)",
    organization: "Govt. Model Hr. Sec. School, Arumbakkam",
    description:
      "Completed HSC with a score of 540/600. Developed an interest in computer science and technology during this period.",
    technologies: [],
    status: "Completed",
  },
  {
    id: "sslc",
    year: "2023",
    title: "Secondary School Leaving Certificate (Class X)",
    organization: "Govt. Model Hr. Sec. School, Arumbakkam",
    description:
      "Completed SSLC with a score of 392/500. Took part in school science exhibitions.",
    technologies: [],
    status: "Completed",
  },
] as const;
