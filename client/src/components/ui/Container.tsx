/**
 * DESIGN: Dark Theme · Glassmorphism · Premium
 * 
 * Container component — reusable max-width wrapper with responsive padding.
 * 
 * Sizes: sm, md, default (lg), xl, full
 */

import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

const containerVariants = cva(
  [
    "mx-auto w-full",
    "px-4 sm:px-6 lg:px-8",
  ],
  {
    variants: {
      size: {
        sm: "max-w-2xl",
        md: "max-w-4xl",
        default: "max-w-6xl",
        xl: "max-w-7xl",
        full: "max-w-none",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, children, ...props }, ref) => {
    return (
      <div
        className={cn(containerVariants({ size }), className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

export { Container, containerVariants };
