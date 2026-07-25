/**
 * SKILLS DATA
 * 
 * All Skills section content — separated from UI.
 * Source of truth: Uploaded resume + user confirmation.
 * 
 * Only skills that appear in the resume or that the user has
 * explicitly confirmed using. No invented skills.
 */

export type SkillIcon =
  | "code"
  | "file-code"
  | "terminal"
  | "brain"
  | "layers"
  | "git-branch"
  | "sparkles";

export interface Skill {
  name: string;
  icon: SkillIcon;
  level: "beginner" | "intermediate" | "advanced";
}

export interface SkillCategory {
  title: string;
  icon: SkillIcon;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    icon: "code",
    skills: [
      { name: "Python", icon: "terminal", level: "intermediate" },
      { name: "C", icon: "code", level: "beginner" },
    ],
  },
  {
    title: "Tools",
    icon: "terminal",
    skills: [
      { name: "Git", icon: "git-branch", level: "beginner" },
      { name: "GitHub", icon: "git-branch", level: "beginner" },
      { name: "VS Code", icon: "terminal", level: "beginner" },
      { name: "MS Word", icon: "file-code", level: "intermediate" },
      { name: "MS PowerPoint", icon: "layers", level: "intermediate" },
      { name: "MS Excel", icon: "layers", level: "intermediate" },
    ],
  },
] as const;
