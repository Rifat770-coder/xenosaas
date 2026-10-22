"use client";
import type { ReactNode } from "react";
import useScrollReveal from "@/hooks/useScrollReveal";
export interface RevealProps {
  children: ReactNode;
  as?: "div" | "p";
  className?: string;
  delay?: number;
  distance?: number;
  scale?: number;
}
export default function ScrollReveal({
  children,
  as = "div",
  className = "",
  delay = 0,
  distance = 60,
  scale = 1,
}: RevealProps) {
  const scope = useScrollReveal({ distance, delay, scale });
  const Element = as;
  return (
    <Element ref={scope} className={`scroll-reveal ${className}`}>
      {children}
    </Element>
  );
}
