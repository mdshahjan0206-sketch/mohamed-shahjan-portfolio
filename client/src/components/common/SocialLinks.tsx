/**
 * DESIGN: Dark Theme · Glassmorphism · Premium
 * 
 * SocialLinks — reusable social icon links.
 * Includes: GitHub, LinkedIn, Email.
 * Animated hover with Lucide React icons.
 */

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/cn";
import { socialLinks as defaultLinks, type SocialLink } from "@/config/social";

export interface SocialLinksProps {
  links?: SocialLink[];
  className?: string;
  /** Controls icon size. Default: "md" */
  iconSize?: "sm" | "md" | "lg";
}

const ICON_MAP = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
} as const;

const SIZE_MAP = {
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
} as const;

export function SocialLinks({
  links,
  className,
  iconSize = "md",
}: SocialLinksProps) {
  const socialLinks = links || defaultLinks;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {socialLinks.map((link) => {
        const Icon = ICON_MAP[link.icon];
        return (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.icon !== "mail" ? "_blank" : undefined}
            rel={link.icon !== "mail" ? "noopener noreferrer" : undefined}
            aria-label={link.label}
            className={cn(
              "inline-flex items-center justify-center",
              "w-10 h-10 rounded-md",
              "bg-white/5 border border-white/10",
              "text-muted-foreground",
              "transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
              "hover:bg-primary/10 hover:border-primary/30 hover:text-primary",
              "hover:shadow-[0_0_15px_rgba(0,245,255,0.1)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
          >
            <Icon className={SIZE_MAP[iconSize]} />
          </motion.a>
        );
      })}
    </div>
  );
}
