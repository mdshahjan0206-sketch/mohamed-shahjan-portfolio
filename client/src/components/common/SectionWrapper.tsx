/**
 * DESIGN: Dark Theme · Glassmorphism · Premium
 *
 * SectionWrapper — shared layout shell for every page section.
 * Provides:
 *   - <section> landmark with id anchor (for Navbar smooth-scroll)
 *   - Consistent vertical rhythm + container padding
 *   - Scroll-triggered stagger animation (orchestrates child
 *     fadeUp / staggerContainer variants defined in lib/motion.ts)
 */

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { staggerContainer } from "@/lib/motion";

export interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function SectionWrapper({ id, children, className }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={staggerContainer}
      className={cn("relative py-20 sm:py-28 scroll-mt-16 sm:scroll-mt-20", className)}
    >
      <div className="container">{children}</div>
    </motion.section>
  );
}
