/**
 * SOCIAL LINKS CONFIGURATION
 * 
 * Social platform links — label, URL, and icon identifier.
 * Source of truth: Uploaded resume.
 * 
 * Consumed by SocialLinks component and Footer.
 */

export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail";
}

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/mdshahjan0206-sketch",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mohamed-shahjan-s-533278383/",
    icon: "linkedin",
  },
  {
    label: "Email",
    href: "mailto:mdshahjan0206@gmail.com",
    icon: "mail",
  },
] as const;
