/**
 * DESIGN: Dark Theme · Glassmorphism · Premium
 * 
 * BackgroundEffects — configurable animated background layer.
 * Each section or page can customize the background independently.
 * 
 * Props:
 *   showGrid     — toggle subtle grid pattern
 *   showGlow     — toggle ambient glow pulses
 *   showGradient — toggle gradient blobs + radial overlay
 *   blurStrength — sm | md | lg (controls blur radius)
 *   opacity      — 0–100, controls overall element opacity
 */

import { motion } from "framer-motion";
import { floating, pulseGlow } from "@/lib/motion";

const BLUR_MAP = {
  sm: { blob: 80, pulse: 50 },
  md: { blob: 120, pulse: 70 },
  lg: { blob: 160, pulse: 100 },
} as const;

export interface BackgroundEffectsProps {
  /** Show subtle grid pattern. Default: true */
  showGrid?: boolean;
  /** Show ambient glow pulses. Default: true */
  showGlow?: boolean;
  /** Show gradient blobs and radial overlay. Default: true */
  showGradient?: boolean;
  /** Blur intensity for blobs and glows. Default: "md" */
  blurStrength?: "sm" | "md" | "lg";
  /** Overall opacity multiplier (0–100). Default: 100 */
  opacity?: number;
}

export function BackgroundEffects({
  showGrid = true,
  showGlow = true,
  showGradient = true,
  blurStrength = "md",
  opacity = 100,
}: BackgroundEffectsProps) {
  const blur = BLUR_MAP[blurStrength];
  const opacityMultiplier = opacity / 100;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Gradient Blobs */}
      {showGradient && (
        <>
          {/* Cyan blob — top left */}
          <motion.div
            variants={floating}
            animate="animate"
            className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full"
            style={{
              background: `rgba(0, 245, 255, ${0.05 * opacityMultiplier})`,
              filter: `blur(${blur.blob}px)`,
            }}
          />
          {/* Purple blob — bottom right */}
          <motion.div
            variants={floating}
            animate="animate"
            className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full"
            style={{
              background: `rgba(124, 58, 237, ${0.05 * opacityMultiplier})`,
              filter: `blur(${blur.blob}px)`,
            }}
          />
          {/* Blue blob — center right */}
          <motion.div
            variants={floating}
            animate="animate"
            className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full -translate-y-1/2"
            style={{
              background: `rgba(56, 189, 248, ${0.03 * opacityMultiplier})`,
              filter: `blur(${blur.blob}px)`,
            }}
          />
        </>
      )}

      {/* Grid Pattern */}
      {showGrid && (
        <div
          className="absolute inset-0"
          style={{
            opacity: 0.03 * opacityMultiplier,
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      )}

      {/* Glow Effects */}
      {showGlow && (
        <>
          {/* Primary glow — subtle ambient pulse */}
          <motion.div
            variants={pulseGlow}
            animate="animate"
            className="absolute top-0 left-1/4 w-[300px] h-[300px] rounded-full"
            style={{
              background: `rgba(0, 245, 255, ${0.05 * opacityMultiplier})`,
              filter: `blur(${blur.pulse}px)`,
            }}
          />
          {/* Secondary glow — bottom left */}
          <motion.div
            variants={pulseGlow}
            animate="animate"
            className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] rounded-full"
            style={{
              background: `rgba(124, 58, 237, ${0.05 * opacityMultiplier})`,
              filter: `blur(${blur.pulse}px)`,
              animationDelay: "1.5s",
            }}
          />
        </>
      )}

      {/* Radial gradient overlay — adds depth */}
      {showGradient && (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,245,255,${0.03 * opacityMultiplier}), transparent)`,
          }}
        />
      )}
    </div>
  );
}
