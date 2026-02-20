"use client";

import { memo } from "react";
import { cn } from "./utils";

export interface GlowingEffectProps {
  variant?: "default" | "white";
  glow?: boolean;
  className?: string;
  borderWidth?: number;
}

export const GlowingEffect = memo(
  ({
    variant = "default",
    glow = true,
    className,
    borderWidth = 1,
  }: GlowingEffectProps) => {
    const gradient =
      variant === "white"
        ? "linear-gradient(135deg, rgba(248,250,252,0.9), rgba(148,163,184,0.15))"
        : "linear-gradient(135deg, #111827, #1f2937, #0f172a)";

    return (
      <div
        className={cn(
          "pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          glow && "opacity-100",
          className,
        )}
        style={{
          borderWidth,
          borderStyle: "solid",
          borderImage: `${gradient} 1`,
          boxShadow:
            variant === "white"
              ? "0 0 28px rgba(226,232,240,0.35)"
              : "0 0 26px rgba(15,23,42,0.9)",
        }}
      />
    );
  },
);
