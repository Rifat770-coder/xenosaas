"use client";
import type { ReactNode } from "react";
import useEntrance from "@/hooks/useEntrance";
export default function IntroReveal({
  children,
  as = "div",
  className = "",
  delay = 0,
  duration = 0.6,
  distance = 20,
}: {
  children: ReactNode;
  as?: "div" | "span";
  className?: string;
  delay?: number;
  duration?: number;
  distance?: number;
}) {
  const scope = useEntrance({ delay, duration, distance });
  const Element = as;
  return (
    <Element ref={scope} className={`intro-reveal ${className}`}>
      {children}
    </Element>
  );
}
