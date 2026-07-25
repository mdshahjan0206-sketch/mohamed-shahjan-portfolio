/**
 * PROJECT TYPES
 *
 * TypeScript interfaces for project data.
 * All project information flows through these types.
 */

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  category: string;
  status: "Completed" | "In Progress";
  image?: string;
  github?: string;
  live?: string;
  featured: boolean;
}
