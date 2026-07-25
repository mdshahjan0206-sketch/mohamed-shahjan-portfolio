/**
 * PROJECTS DATA
 * 
 * All Projects section content — separated from UI.
 * Source of truth: Uploaded resume + user instructions.
 * 
 * Only 2 projects: Student Performance Predictor (Completed)
 * and DigiLogBook (In Development — concept only).
 */

import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "student-performance-predictor",
    title: "Student Performance Predictor",
    subtitle: "Prediction System Using ML",
    description:
      "An academic project that predicts student academic performance using Machine Learning techniques. Developed as part of coursework to apply ML concepts on real-world educational data.",
    technologies: ["Python", "Machine Learning"],
    category: "AI / Machine Learning",
    status: "Completed",
    image: undefined,
    github: undefined,
    live: undefined,
    featured: true,
  },
  {
    id: "digi-logbook",
    title: "DigiLogBook",
    subtitle: "AI-Powered Digital Logbook",
    description:
      "An AI-powered digital logbook concept currently under development. Aims to modernize the traditional academic logbook experience with intelligent features for tracking coursework, experiments, and project milestones.",
    technologies: [],
    category: "Concept",
    status: "In Progress",
    image: undefined,
    github: undefined,
    live: undefined,
    featured: false,
  },
] as const;

export const projectCategories = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.category))),
] as const;
