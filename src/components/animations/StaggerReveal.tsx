"use client";
import { Children, useRef, useSyncExternalStore, type ReactNode } from "react";
import { useInView } from "motion/react";
import ScrollReveal from "./ScrollReveal";
import { RevealGroup } from "./RevealGroup";
const subscribe = (cb: () => void) => {
  const m = matchMedia("(min-width: 768px)");
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};
export default function StaggerReveal({
  children,
  className = "",
  interval = 0.15,
  delay = 0.1,
  scale = 0.98,
  coordinate = true,
}: {
  children: ReactNode;
  className?: string;
  interval?: number;
  delay?: number;
  scale?: number;
  coordinate?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.2 });
  const desktop = useSyncExternalStore(
    subscribe,
    () => matchMedia("(min-width: 768px)").matches,
    () => false,
  );
  return (
    <div ref={ref} className={className}>
      <RevealGroup.Provider value={coordinate && desktop ? visible : null}>
        {Children.map(children, (child, index) => (
          <ScrollReveal scale={scale} delay={delay + index * interval}>
            {child}
          </ScrollReveal>
        ))}
      </RevealGroup.Provider>
    </div>
  );
}

