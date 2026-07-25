/**
 * DESIGN: Dark Theme · Glassmorphism · Premium
 * 
 * Button component with 4 variants and 3 sizes.
 * Uses class-variance-authority (cva) for type-safe variant composition.
 * 
 * Variants: primary, secondary, outline, ghost
 * Sizes: sm, md, lg
 * States: hover, active (scale 0.97), disabled, loading
 */

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "font-medium text-sm leading-none",
    "rounded-md",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "select-none",
    "whitespace-nowrap",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-[0_0_20px_rgba(0,245,255,0.15)] hover:shadow-[0_0_30px_rgba(0,245,255,0.25)] hover:brightness-110",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[0_0_20px_rgba(124,58,237,0.15)] hover:shadow-[0_0_30px_rgba(124,58,237,0.25)] hover:brightness-110",
        outline:
          "border border-border bg-transparent text-foreground hover:border-primary/50 hover:text-primary hover:shadow-[0_0_15px_rgba(0,245,255,0.08)]",
        ghost:
          "bg-transparent text-foreground hover:bg-white/5 hover:text-primary",
      },
      size: {
        sm: "h-9 px-3 text-xs",
        md: "h-10 px-5 text-sm",
        lg: "h-12 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** When true, renders as a child of the provided `asChild` element. */
  asChild?: boolean;
  /** Shows a loading spinner and disables interaction. */
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size }),
          isDisabled && "pointer-events-none opacity-50",
          className
        )}
        disabled={isDisabled}
        ref={ref}
        {...props}
      >
        {loading && <Loader2 className="size-4 animate-spin" />}
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
