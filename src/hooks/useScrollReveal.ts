"use client";
import { useContext, useEffect, useRef } from "react";
import { RevealGroup } from "@/components/animations/RevealGroup";
import { useAnimate, useInView, useReducedMotion } from "motion/react";

export default function useScrollReveal({
  delay,
  distance,
  scale = 1,
}: {
  delay: number;
  distance: number;
  scale?: number;
}) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const inView = useInView(scope, { amount: 0.2 });
  const present = useInView(scope, { amount: "some" });
  const group = useContext(RevealGroup);
  const active = group === null ? inView : group;
  const reduced = useReducedMotion();
  const completed = useRef(false);

  useEffect(() => {
    if (!scope.current) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // Never hide server HTML. Prepare the offscreen state only after hydration.
    // The focus CSS rule reveals content without moving mouse click targets.
    const reset = !present && (group === null || !group);
    if (reset) completed.current = false;
    if (reduce || completed.current) {
      if (reduce) completed.current = true;
      const controls = animate(
        scope.current,
        { opacity: 1, y: 0, scale: 1 },
        { duration: 0 },
      );
      return () => controls.stop();
    }
    const travel = window.matchMedia("(max-width: 700px)").matches
      ? Math.min(distance, 24)
      : distance;
    if (!active) {
      const controls = animate(
        scope.current,
        { opacity: 0, y: travel, scale },
        { duration: 0 },
      );
      return () => controls.stop();
    }
    const controls = animate(
      scope.current,
      { opacity: [0, 1], y: [travel, 0], scale: [scale, 1] },
      {
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
        onComplete: () => {
          completed.current = true;
        },
      },
    );
    // A failed observer/animation must not strand important content invisibly.
    const fallback = window.setTimeout(
      () => {
        animate(scope.current, { opacity: 1, y: 0, scale: 1 }, { duration: 0 });
        completed.current = true;
      },
      (delay + 0.8) * 1000 + 1000,
    );
    return () => {
      controls.stop();
      window.clearTimeout(fallback);
    };
  }, [scope, animate, active, present, group, reduced, delay, distance, scale]);
  return scope;
}

