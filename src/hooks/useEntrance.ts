"use client";
import { useEffect } from "react";
import { useAnimate, useInView, useReducedMotion } from "motion/react";
export interface EntranceOptions {
  delay?: number;
  duration?: number;
  distance?: number;
  scale?: number;
  rotateX?: number;
  trigger?: "mount" | "view";
}
// Server markup is always visible. Start explicit keyframes only after hydration
// or first viewport entry; initial=false would suppress a mount animation.
export default function useEntrance({
  delay = 0,
  duration = 0.6,
  distance = 20,
  scale = 1,
  rotateX = 0,
  trigger = "mount",
}: EntranceOptions = {}) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const inView = useInView(scope, { once: true, amount: 0.18 });
  const reduced = useReducedMotion();
  const active = trigger === "mount" || inView;
  useEffect(() => {
    if (!scope.current || !active) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const animation = reduce
      ? animate(
          scope.current,
          { opacity: 1, y: 0, scale: 1, rotateX: 0 },
          { duration: 0 },
        )
      : animate(
          scope.current,
          {
            opacity: [0, 1],
            y: [distance, 0],
            scale: [scale, 1],
            rotateX: [rotateX, 0],
          },
          { delay, duration, ease: [0.22, 1, 0.36, 1] },
        );
    return () => animation.stop();
  }, [
    animate,
    scope,
    reduced,
    active,
    delay,
    duration,
    distance,
    scale,
    rotateX,
  ]);
  return scope;
}
