/**
 * DESIGN: Dark Theme · Glassmorphism · Premium
 * 
 * Projects Section — featured project + responsive card grid:
 *   - Category filter chips (Badge-based, animated active state)
 *   - Featured project (full width, prominent)
 *   - Remaining projects in responsive cards (1 col mobile, 2 col desktop)
 *   - GitHub + Live buttons only rendered when URLs exist
 *   - Data-driven from src/data/projects.ts
 *   - Animations: staggerContainer, fadeUp, hover lift (from motion.ts)
 *   - Accessibility: semantic <article>, keyboard nav, ARIA labels
 */

import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Card } from "@/components/ui/Card";
import { ProjectImage } from "./ProjectImage";
import { projects, projectCategories } from "@/data/projects";
import type { Project } from "@/types/project";
import { fadeUp, staggerContainer } from "@/lib/motion";



/* ============================================
   PROJECT CARD (Memoized)
   ============================================ */

const ProjectCard = function ProjectCard({
  project,
  index,
  featured,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  const hasLinks = project.github || project.live;

  return (
    <motion.article
      variants={fadeUp}
      custom={index}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`group ${featured ? "lg:col-span-2" : ""}`}
      aria-label={`${project.title} — ${project.subtitle}`}
    >
      <Card variant={featured ? "featured" : "hover"} className="h-full flex flex-col overflow-hidden">
        {/* Image */}
        <ProjectImage project={project} />

        {/* Content */}
        <div className="flex flex-col flex-1 p-5 sm:p-6">
          {/* Title + Subtitle */}
          <div className="mb-3">
            <h3 className="text-lg sm:text-xl font-bold text-foreground font-[family-name:var(--font-display)] group-hover:text-primary transition-colors duration-200">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {project.subtitle}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
            {project.description}
          </p>

          {/* Technology Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="technology">
                {tech}
              </Badge>
            ))}
          </div>

          {/* Action Buttons — only render if URLs exist */}
          {hasLinks && (
            <div className="flex items-center gap-3 pt-4 border-t border-border/50">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} source code on GitHub`}
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <Github className="size-4" />
                  <span>Source</span>
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} live demo`}
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors duration-200"
                >
                  <ExternalLink className="size-4" />
                  <span>Live Demo</span>
                </a>
              )}
            </div>
          )}
        </div>
      </Card>
    </motion.article>
  );
};

/* ============================================
   FEATURED PROJECT (Horizontal Layout)
   ============================================ */

function FeaturedProject({ project }: { project: Project }) {
  const hasLinks = project.github || project.live;

  return (
    <motion.article
      variants={fadeUp}
      className="group"
      aria-label={`${project.title} — featured project`}
    >
      <Card variant="featured" className="overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Left — Image */}
          <div className="w-full">
            <ProjectImage project={project} />
          </div>

          {/* Right — Content */}
          <div className="flex flex-col p-5 sm:p-8">
            {/* Status badge */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
                Featured Project
              </span>
              <span
                className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                  project.status === "Completed"
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                }`}
              >
                {project.status}
              </span>
            </div>

            {/* Title + Subtitle */}
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground font-[family-name:var(--font-display)] group-hover:text-primary transition-colors duration-200">
              {project.title}
            </h3>
            <p className="text-base text-muted-foreground mt-2 mb-4">
              {project.subtitle}
            </p>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
              {project.description}
            </p>

            {/* Technology Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="technology">
                  {tech}
                </Badge>
              ))}
            </div>

            {/* Action Buttons */}
            {hasLinks && (
              <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} source code on GitHub`}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    <Github className="size-4" />
                    <span>Source Code</span>
                  </a>
                )}
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.title} live demo`}
                    className="inline-flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors duration-200"
                  >
                    <ExternalLink className="size-4" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.article>
  );
}

/* ============================================
   PROJECTS SECTION
   ============================================ */

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const featured = useMemo(
    () => filteredProjects.find((p) => p.featured),
    [filteredProjects]
  );

  const regular = useMemo(
    () => filteredProjects.filter((p) => !p.featured),
    [filteredProjects]
  );

  const handleFilterClick = useCallback((category: string) => {
    setActiveCategory(category);
  }, []);

  return (
    <SectionWrapper id="projects">
      <SectionHeading
        eyebrow="Projects"
        title="What I've Built"
        description="Selected work showcasing my skills in web development, AI/ML, and software engineering."
      />

      {/* Category Filter Chips */}
      <motion.div
        variants={fadeUp}
        className="flex flex-wrap gap-2 mb-10"
        role="tablist"
        aria-label="Filter projects by category"
      >
        {projectCategories.map((category) => (
          <motion.button
            key={category}
            role="tab"
            aria-selected={activeCategory === category}
            onClick={() => handleFilterClick(category)}
            whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
            whileTap={{ scale: 0.97, transition: { duration: 0.12 } }}
            className={`text-xs sm:text-sm font-medium px-4 py-2 rounded-full border transition-colors duration-200 ${
              activeCategory === category
                ? "bg-primary text-background border-primary shadow-[0_0_12px_rgba(0,245,255,0.3)]"
                : "bg-transparent text-muted-foreground border-border/50 hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        key={activeCategory}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        role="tabpanel"
      >
        <AnimatePresence mode="wait">
          {/* Featured project first */}
          {featured && (
            <FeaturedProject key={featured.id} project={featured} />
          )}

          {/* Remaining projects */}
          {regular.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  );
}
