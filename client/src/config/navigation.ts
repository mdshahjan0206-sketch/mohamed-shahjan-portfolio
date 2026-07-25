/**
 * NAVIGATION CONFIGURATION
 * 
 * Navbar links — label, href (section anchor), and optional icon.
 * Consumed by Navbar for desktop nav and mobile menu.
 */

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education & Journey", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
] as const;
