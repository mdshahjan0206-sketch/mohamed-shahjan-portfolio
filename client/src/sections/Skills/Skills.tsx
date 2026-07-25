/**
 * DESIGN: Dark Theme · Glassmorphism · Premium
 * 
 * Skills Section — category-based grid with:
 *   - 7 categories in glass cards
 *   - Each skill as a Badge with icon, name, hover animation, glow
 *   - Responsive: 1 col mobile, 2 col tablet, 3 col desktop
 *   - Data-driven from src/data/skills.ts
 *   - Animations: staggerContainer, fadeUp (from motion.ts)
 *   - Accessibility: keyboard focus, ARIA labels, semantic headings
 */

import { motion } from "framer-motion";
import {
  Code,
  FileCode,
  Brain,
  Terminal,
  GitBranch,
  Sparkles,
  Layers,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card } from "@/components/ui/Card";
import { skillCategories, type SkillIcon, type Skill } from "@/data/skills";
import { fadeUp, staggerContainer } from "@/lib/motion";

/* ============================================
   ICON MAP
   ============================================ */

const ICON_MAP: Record<SkillIcon, LucideIcon> = {
  code: Code,
  "file-code": FileCode,
  terminal: Terminal,
  brain: Brain,
  layers: Layers,
  "git-branch": GitBranch,
  sparkles: Sparkles,
};

/* ============================================
   LEVEL INDICATOR
   ============================================ */

const LEVEL_LABELS: Record<Skill["level"], string> = {
  beginner: "B",
  intermediate: "I",
  advanced: "A",
};

/* ============================================
   CATEGORY CARD
   ============================================ */

function CategoryCard({
  category,
  index,
}: {
  category: (typeof skillCategories)[number];
  index: number;
}) {
  const CategoryIcon = ICON_MAP[category.icon];

  return (
    <motion.div variants={fadeUp}>
      <Card variant="glass" className="h-full flex flex-col">
        {/* Category Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-secondary/10 border border-secondary/20">
            <CategoryIcon className="size-4 text-secondary" />
          </div>
          <h3 className="text-base font-semibold text-foreground font-[family-name:var(--font-display)]">
            {category.title}
          </h3>
        </div>

        {/* Skills Grid */}
        <div className="flex flex-wrap gap-2">
          {category.skills.map((skill) => {
            const SkillIcon = ICON_MAP[skill.icon];
            return (
              <motion.span
                key={skill.name}
                whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
                className="group relative"
                aria-label={`${skill.name} — ${skill.level}`}
              >
                <Badge variant="skill">
                  <SkillIcon className="size-3" />
                  <span>{skill.name}</span>
                </Badge>
                {/* Level indicator — visible on hover */}
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-background border border-primary/40 flex items-center justify-center text-[8px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  {LEVEL_LABELS[skill.level]}
                </span>
              </motion.span>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}

/* ============================================
   SKILLS SECTION
   ============================================ */

export function Skills() {
  return (
    <SectionWrapper id="skills">
      <SectionHeading
        eyebrow="Skills & Expertise"
        title="What I Work With"
        description="Technologies and tools I use to build intelligent systems, full-stack applications, and interactive experiences."
      />

      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {skillCategories.map((category, index) => (
          <CategoryCard key={category.title} category={category} index={index} />
        ))}
      </motion.div>
    </SectionWrapper>
  );
}
