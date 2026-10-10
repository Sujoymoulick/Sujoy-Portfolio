"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface MotionGridProps {
  speed?: string;
  opacity?: number;
  direction?: "left" | "right";
  lineColor?: string;
  lineWidth?: string;
  gridSpacing?: string;
  backgroundColor?: string;
  glowGradient?: string;
  enableGlow?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function MotionGrid({
  speed = "30s",
  opacity = 0.15,
  direction = "right",
  lineColor = "20, 184, 166",
  lineWidth = "1px",
  gridSpacing = "20px",
  backgroundColor = "transparent",
  enableGlow = true,
  className,
  children,
}: MotionGridProps) {
  const id = React.useId();
  const directionValue = direction === "right" ? "40px" : "-40px";

  return (
    <div
      className={cn("relative overflow-hidden w-full h-full", className)}
      style={{ backgroundColor }}
    >
      <style>{`
        @keyframes diagonalGridMove-${id.replace(/:/g, "")} {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: ${directionValue} ${directionValue};
          }
        }
        .motion-grid-glow-light {
          background: radial-gradient(125% 125% at 50% 10%, #ffffff 35%, #14b8a6 100%);
        }
        html.dark .motion-grid-glow-light {
          background: radial-gradient(125% 125% at 50% 10%, #0f1117 35%, #0d9488 100%);
        }
      `}</style>

      {enableGlow && (
        <div
          className={cn(
            "absolute inset-0 z-0 motion-grid-glow-light",
            "bg-[radial-gradient(125%_125%_at_50%_10%,#ffffff_35%,#14b8a6_100%)]",
            "dark:bg-[radial-gradient(125%_125%_at_50%_10%,#0f1117_35%,#0d9488_100%)]",
          )}
        />
      )}

      <motion.div
        style={
          {
            "--speed": speed,
            "--line-color": lineColor,
            "--opacity": opacity,
            "--line-width": lineWidth,
            "--grid-spacing": gridSpacing,
            backgroundImage: `
              repeating-linear-gradient(45deg, rgba(var(--line-color), var(--opacity)) 0, rgba(var(--line-color), var(--opacity)) var(--line-width), transparent var(--line-width), transparent var(--grid-spacing)),
              repeating-linear-gradient(-45deg, rgba(var(--line-color), var(--opacity)) 0, rgba(var(--line-color), var(--opacity)) var(--line-width), transparent var(--line-width), transparent var(--grid-spacing))
            `,
            backgroundSize: "40px 40px",
            animation: `diagonalGridMove-${id.replace(/:/g, "")} var(--speed) linear infinite`,
          } as React.CSSProperties
        }
        className="absolute inset-0 z-10 pointer-events-none"
      />

      {children && <div className="relative z-20">{children}</div>}
    </div>
  );
}

export default MotionGrid;
