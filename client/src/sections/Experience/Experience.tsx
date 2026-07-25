/**
 * DESIGN: Dark Theme · Glassmorphism · Premium
 * 
 * Experience Section — vertical timeline with:
 *   - Center timeline line on desktop
 *   - Cards alternate left/right on desktop
 *   - Single column on mobile
 *   - Data-driven from src/data/experience.ts
 *   - Animations: fadeLeft, fadeRight, staggerContainer (from motion.ts)
 *   - Accessibility: semantic structure, ARIA labels, keyboard friendly
 */

import { motion } from "framer-motion";
import { Calendar, MapPin, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card } from "@/components/ui/Card";
import { experiences } from "@/data/experience";
import { fadeLeft, fadeRight, staggerContainer } from "@/lib/motion";

/* ============================================
   TIMELINE ITEM
   ============================================ */

function TimelineItem({
  entry,
  index,
  isLeft,
}: {
  entry: (typeof experiences)[number];
  index: number;
  isLeft: boolean;
}) {
  return (
    <motion.div
      variants={isLeft ? fadeLeft : fadeRight}
      className={`relative flex items-start gap-6 lg:gap-10 ${
        isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
      }`}
    >
      {/* Timeline dot */}
      <div className="absolute left-0 lg:left-1/2 lg:-translate-x-1/2 top-1 z-10">
        <div className="flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-primary border-[3px] border-background shadow-[0_0_10px_rgba(0,245,255,0.4)]" />
          <div className="absolute w-8 h-8 rounded-full bg-primary/10 animate-ping" style={{ animationDuration: "3s" }} />
        </div>
      </div>

      {/* Card */}
      <div className={`ml-8 lg:ml-0 lg:w-[calc(50%-2.5rem)] ${isLeft ? "lg:pr-0" : "lg:pl-0"}`}>
        <Card variant="glass" className="group hover:border-primary/20 transition-colors duration-200">
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                {entry.year}
              </p>
              <h3 className="text-lg font-bold text-foreground font-[family-name:var(--font-display)] group-hover:text-primary transition-colors duration-200">
                {entry.title}
              </h3>
            </div>
            {/* Status badge */}
            <span
              className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shrink-0 ${
                entry.status === "Completed"
                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                  : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
              }`}
            >
              {entry.status}
            </span>
          </div>

          {/* Organization */}
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="size-3.5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {entry.organization}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {entry.description}
          </p>

          {/* Technology Badges */}
          <div className="flex flex-wrap gap-2">
            {entry.technologies.map((tech) => (
              <Badge key={tech} variant="technology">
                {tech}
              </Badge>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
}

/* ============================================
   EXPERIENCE SECTION
   ============================================ */

export function Experience() {
  return (
    <SectionWrapper id="experience">
      <SectionHeading
        eyebrow="Education & Journey"
        title="My Academic Path"
        description="The educational milestones and learning experiences that shaped my foundation."
      />

      {/* Timeline */}
      <motion.div
        variants={staggerContainer}
        className="relative py-4"
      >
        {/* Vertical timeline line (desktop only) */}
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-secondary/30 to-primary/10 -translate-x-1/2" />

        {/* Timeline items */}
        <div className="flex flex-col gap-12 lg:gap-16">
          {experiences.map((entry, index) => (
            <TimelineItem
              key={entry.id}
              entry={entry}
              index={index}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
