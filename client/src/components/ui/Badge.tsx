/**
 * DESIGN: Dark Theme · Glassmorphism · Premium
 * 
 * Badge component for skill tags, technology labels, and status indicators.
 * 
 * Variants: skill, technology, primary, secondary
 */

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1.5",
    "rounded-sm px-2.5 py-0.5",
    "text-xs font-medium",
    "transition-all duration-200",
  ],
  {
    variants: {
      variant: {
        skill: "bg-primary/10 text-primary border border-primary/20",
        technology: "bg-secondary/10 text-secondary border border-secondary/20",
        primary: "bg-primary/20 text-primary border border-primary/30",
        secondary: "bg-secondary/20 text-purple-300 border border-secondary/30",
      },
    },
    defaultVariants: {
      variant: "skill",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <span
        className={cn(badgeVariants({ variant }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export { Badge, badgeVariants };
