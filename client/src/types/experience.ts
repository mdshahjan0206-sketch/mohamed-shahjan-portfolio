/**
 * EXPERIENCE TYPES
 * 
 * TypeScript interfaces for experience timeline data.
 * All experience information flows through these types.
 */

export interface ExperienceEntry {
  id: string;
  year: string;
  title: string;
  organization: string;
  description: string;
  technologies: string[];
  status: "Completed" | "Ongoing";
}
