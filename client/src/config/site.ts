/**
 * SITE CONFIGURATION
 * 
 * Core site metadata — name, role, contact, description.
 * Source of truth: Uploaded resume (Untitled-1.html(2).pdf)
 * 
 * Consumed by Hero, Footer, Contact, and meta tags.
 */

import type { ContactInfo } from "@/types/contact";

export const siteConfig = {
  name: "Mohamed Shahjan S",
  role: "Computer Science Engineering Student",
  subtitle: "Meenakshi Sundararajan Engineering College, Chennai",
  tagline: "Building a strong foundation in computer science through practical projects and problem-solving.",
  description:
    "Mohamed Shahjan S — Computer Science Engineering Student aspiring to become an AI Engineer and Full-Stack Developer. Focused on Python, Machine Learning, and software development.",
  themeColor: "#050816",
  primaryColor: "#00F5FF",
  secondaryColor: "#7C3AED",
  accentColor: "#38BDF8",
  textColor: "#F8FAFC",
} as const;

export const contactInfo: ContactInfo = {
  email: "mdshahjan0206@gmail.com",
  location: "Arumbakkam, Chennai",
  github: "https://github.com/mdshahjan0206-sketch",
  linkedin: "https://www.linkedin.com/in/mohamed-shahjan-s-533278383/",
  resume: undefined,
};
