/**
 * DESIGN: Dark Theme · Glassmorphism · Premium
 * 
 * SectionHeading — reusable section header with eyebrow, title, and description.
 * Uses fadeUp animation on entry.
 */

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { fadeUp } from "@/lib/motion";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        "mb-12 sm:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-widest text-primary mb-3">
          {eyebrow}
        </p>
      )}

      <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
        {title}
      </h2>

      {description && (
        <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
          {description}
        </p>
      )}

      {/* Decorative underline accent */}
      <div
        className={cn(
          "mt-4 h-px w-16 bg-gradient-to-r from-primary to-transparent",
          align === "center" && "mx-auto"
        )}
      />
    </motion.div>
  );
}
