"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { stagger, useAnimate, useInView, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";

export default function WorkspaceReveal({ children }: { children: ReactNode }) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const visible = useInView(scope, { once: true, amount: 0.12 });
  const reduced = useReducedMotion();
  const completed = useRef(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (position) => {
    if (position <= 4) setScrolled(false);
    else if (position >= 64) setScrolled(true);
  });
  useEffect(() => {
    // Also support restored positions and direct navigation to lower anchors.
    const frame = requestAnimationFrame(() => { if (window.scrollY >= 64) setScrolled(true); });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const element = scope.current;
    if (!element) return;
    const cards = Array.from(element.querySelectorAll<HTMLElement>("[data-workspace-card]"));
    if (!scrolled) {
      completed.current = false;
      const panel = animate(element, { visibility: "hidden", opacity: 0 }, { duration: 0 });
      const items = animate(cards, { opacity: 0 }, { duration: 0 });
      return () => { panel.stop(); items.stop(); };
    }
    if (!visible) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || completed.current) {
      const panel = animate(element, { visibility: "visible", opacity: 1, y: 0, scale: 1, rotateX: 0 }, { duration: 0 });
      const items = animate(cards, { opacity: 1, y: 0, filter: "blur(0px)" }, { duration: 0 });
      completed.current = true;
      return () => { panel.stop(); items.stop(); };
    }
    const panel = animate(element,
      { visibility: "visible", opacity: [0, 1], y: [48, 0], scale: [0.96, 1], rotateX: [6, 0], transformPerspective: 1200 },
      { duration: 0.95, ease: [0.22, 1, 0.36, 1] });
    const items = animate(cards,
      { opacity: [0, 1], y: [24, 0], filter: ["blur(3px)", "blur(0px)"] },
      { duration: 0.65, delay: stagger(0.11, { startDelay: 0.2 }), ease: [0.22, 1, 0.36, 1], onComplete: () => { completed.current = true; } });
    return () => { panel.stop(); items.stop(); };
  }, [animate, scope, visible, reduced, scrolled]);

  return <>
    <noscript><style>{`[data-workspace-reveal] { opacity: 1 !important; visibility: visible !important; }`}</style></noscript>
    <div ref={scope} data-workspace-reveal style={{ opacity: 0, visibility: "hidden", transformOrigin: "50% 0%" }}>{children}</div>
  </>;
}


