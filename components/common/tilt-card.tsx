"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type TiltCardProps = React.ComponentPropsWithoutRef<"article"> & {
  /** Strength of the highlight; brighter on light cards. */
  shine?: number;
};

/**
 * A card that leans toward the pointer (mouse or finger) with a soft shine,
 * then settles back, like the share card preview in the app. Turned off for
 * people who prefer reduced motion.
 */
export function TiltCard({
  className,
  children,
  shine = 0.35,
  style,
  ...props
}: TiltCardProps) {
  const ref = React.useRef<HTMLElement>(null);
  const [tilt, setTilt] = React.useState({ x: 0, y: 0, active: false });
  const reduceMotion = React.useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia("(prefers-reduced-motion: reduce)");
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true,
  );

  const move = (event: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    setTilt({
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y)),
      active: true,
    });
  };

  const reset = () => setTilt({ x: 0, y: 0, active: false });

  return (
    <article
      {...props}
      className={cn("relative", className)}
      onPointerCancel={reset}
      onPointerDown={move}
      onPointerLeave={reset}
      onPointerMove={move}
      onPointerUp={(event) => {
        if (event.pointerType !== "mouse") reset();
      }}
      ref={ref}
      style={{
        ...style,
        transform: `perspective(900px) rotateX(${-tilt.y * 10}deg) rotateY(${tilt.x * 12}deg) scale(${tilt.active ? 1.02 : 1})`,
        transition: tilt.active
          ? "transform 120ms ease-out, box-shadow 120ms ease-out"
          : "transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 600ms ease",
        boxShadow: tilt.active
          ? `${-tilt.x * 14}px ${24 - tilt.y * 10}px 70px -24px rgba(76, 52, 160, 0.55)`
          : undefined,
        touchAction: reduceMotion ? undefined : "none",
        willChange: "transform",
      }}
    >
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-plus-lighter"
        style={{
          opacity: tilt.active ? 1 : 0,
          transition: "opacity 300ms ease",
          background: `radial-gradient(circle at ${50 + tilt.x * 45}% ${50 + tilt.y * 45}%, rgba(255,255,255,${shine}) 0%, rgba(255,255,255,0) 55%)`,
        }}
      />
    </article>
  );
}
