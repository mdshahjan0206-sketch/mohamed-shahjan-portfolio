/**
 * PROJECT IMAGE COMPONENT
 * 
 * Renders a real project image if `image` URL exists.
 * Falls back to a placeholder with category icon if no image.
 * 
 * Supports lazy loading via native `loading="lazy"`.
 */

import { useState } from "react";
import { FolderOpen, Code2, FlaskConical } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Project } from "@/types/project";

const ICON_MAP: Record<string, LucideIcon> = {
  "Web Application": FolderOpen,
  "AI / Machine Learning": FlaskConical,
  "Game Development": Code2,
};

const GRADIENT_MAP: Record<string, string> = {
  "Web Application": "from-primary/20 to-accent/10",
  "AI / Machine Learning": "from-secondary/20 to-purple-400/10",
  "Game Development": "from-primary/15 to-purple-400/15",
};

function Placeholder({ project }: { project: Project }) {
  const Icon = ICON_MAP[project.category] || Code2;
  const gradient = GRADIENT_MAP[project.category] || "from-primary/20 to-accent/10";

  return (
    <div
      className={`relative w-full h-48 sm:h-56 bg-gradient-to-br ${gradient} border border-white/5`}
      role="img"
      aria-label={`${project.title} preview`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-14 h-14 rounded-xl bg-background/50 backdrop-blur-sm border border-white/10 flex items-center justify-center">
            <Icon className="size-7 text-primary" />
          </div>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {project.category}
          </span>
        </div>
      </div>
      {/* Status badge overlay */}
      <div className="absolute top-3 right-3">
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
    </div>
  );
}

export function ProjectImage({ project }: { project: Project }) {
  const [imgError, setImgError] = useState(false);

  if (project.image && !imgError) {
    return (
      <div className="relative w-full h-48 sm:h-56 overflow-hidden border border-white/5">
        <img
          src={project.image}
          alt={`${project.title} screenshot`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
        {/* Status badge overlay */}
        <div className="absolute top-3 right-3">
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
      </div>
    );
  }

  return <Placeholder project={project} />;
}
