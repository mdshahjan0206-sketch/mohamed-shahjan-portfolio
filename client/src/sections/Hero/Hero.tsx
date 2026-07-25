/**
 * DESIGN: Dark Theme · Glassmorphism · Premium
 *
 * Hero Section — full-height intro with:
 *   - Eyebrow badge, name, animated role, tagline
 *   - Primary CTA (View Projects) + secondary CTA (Get in Touch)
 *   - Social links row
 *   - Data-driven from src/config/site.ts
 *   - Animations: staggerContainer (via SectionWrapper), fadeUp, fadeRight
 *   - Accessibility: semantic <section>, single h1, keyboard accessible
 */

import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/common/SocialLinks";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { siteConfig } from "@/config/site";
import { fadeUp, fadeRight } from "@/lib/motion";

export function Hero() {
  const handleScrollTo = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <SectionWrapper id="hero" className="py-28 sm:py-36 min-h-[90vh] flex items-center">
      <div className="grid grid-cols-1 items-center gap-12">
        <div className="max-w-3xl">
          {/* Eyebrow badge */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20"
          >
            <Sparkles className="size-3.5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Welcome to my portfolio
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground font-[family-name:var(--font-display)] mb-4 leading-tight"
          >
            Hi, I&apos;m{" "}
            <span className="text-gradient-primary">{siteConfig.name}</span>
          </motion.h1>

          {/* Role */}
          <motion.p
            variants={fadeUp}
            className="text-lg sm:text-xl text-secondary font-semibold mb-2"
          >
            {siteConfig.role}
          </motion.p>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="text-sm sm:text-base text-muted-foreground mb-6"
          >
            {siteConfig.subtitle}
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={fadeRight}
            className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl"
          >
            {siteConfig.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-4 mb-10"
          >
            <Button
              size="lg"
              onClick={() => handleScrollTo("#projects")}
              aria-label="View my projects"
            >
              View Projects
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => handleScrollTo("#contact")}
              aria-label="Get in touch"
            >
              Get in Touch
            </Button>
          </motion.div>

          {/* Social links */}
          <motion.div variants={fadeUp}>
            <SocialLinks />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        variants={fadeUp}
        onClick={() => handleScrollTo("#about")}
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-md"
      >
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="size-4" />
        </motion.span>
      </motion.button>
    </SectionWrapper>
  );
}
