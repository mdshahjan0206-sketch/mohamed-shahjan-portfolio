/**
 * CERTIFICATES DATA
 * 
 * All Certifications section content — separated from UI.
 * Source of truth: Uploaded certificate files.
 * 
 * Certificate 1: CodSoft Virtual Internship (Python Programming, 4 weeks)
 * Certificate 2: NPTEL Elite Certification (The Joy of Computing Using Python, IIT Madras)
 */

import type { Certificate } from "@/types/certificate";

export const certificates: Certificate[] = [
  {
    id: "codsoft-python-internship",
    title: "Python Programming",
    issuer: "CodSoft (Virtual Internship)",
    issuedDate: "June – July 2026",
    credentialId: undefined,
    credentialUrl: undefined,
    image: undefined,
    skills: ["Python"],
    featured: true,
  },
  {
    id: "nptel-joy-of-computing",
    title: "The Joy of Computing Using Python",
    issuer: "NPTEL – IIT Madras (Elite Certification)",
    issuedDate: "2026",
    credentialId: undefined,
    credentialUrl: undefined,
    image: undefined,
    skills: ["Python", "Computing"],
    featured: false,
  },
] as const;
