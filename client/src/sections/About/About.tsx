/**
 * DESIGN: Dark Theme · Glassmorphism · Premium
 *
 * About Section — two-column layout with:
 *   - Left: journey paragraphs + highlight checklist
 *   - Right: glass stat cards (education, projects, technologies)
 *   - Data-driven from src/data/about.ts
 *   - Animations: staggerContainer (via SectionWrapper), fadeUp, fadeLeft, fadeRight
 *   - Accessibility: semantic headings, ARIA labels
 */

import { motion } from "framer-motion";
import { CheckCircle2, GraduationCap, FolderGit2, Cpu } from "lucide-react";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card } from "@/components/ui/Card";
import { about } from "@/data/about";
import { fadeUp, fadeLeft, fadeRight, staggerContainer } from "@/lib/motion";

const STATS = [
  { icon: GraduationCap, label: "Education", value: about.education },
  { icon: FolderGit2, label: "Projects", value: about.projectsCompleted },
  { icon: Cpu, label: "Technologies", value: about.technologies },
];

export function About() {
  return (
    <SectionWrapper id="about">
      <SectionHeading
        eyebrow={about.sectionHeading.eyebrow}
        title={about.sectionHeading.title}
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
        {/* Left — Journey + Highlights */}
        <motion.div variants={fadeLeft} className="lg:col-span-3 flex flex-col gap-6">
          {about.journey.map((paragraph, i) => (
            <p
              key={i}
              className="text-base text-muted-foreground leading-relaxed"
            >
              {paragraph}
            </p>
          ))}

          <motion.ul
            variants={staggerContainer}
            className="flex flex-col gap-3 mt-2"
            aria-label="Key strengths"
          >
            {about.highlights.map((highlight) => (
              <motion.li
                key={highlight}
                variants={fadeUp}
                className="flex items-center gap-3 text-sm text-foreground"
              >
                <CheckCircle2 className="size-4 text-primary shrink-0" />
                <span>{highlight}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Right — Stat Cards */}
        <motion.div
          variants={fadeRight}
          className="lg:col-span-2 flex flex-col gap-4"
        >
          {STATS.map((stat) => (
            <Card key={stat.label} variant="glass" className="flex items-center gap-4">
              <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 shrink-0">
                <stat.icon className="size-5 text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                  {stat.label}
                </p>
                <p className="text-sm font-medium text-foreground">
                  {stat.value}
                </p>
              </div>
            </Card>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
