"use client";

import { useEffect, useRef } from "react";
import type { AnimationItem } from "lottie-web";

export default function DevelopmentAnimation({ className, src = "/development-icon.lottie.json" }: { className: string; src?: string }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    let animation: AnimationItem | undefined;
    let disposed = false;
    let visible = false;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      if (!animation) return;
      if (reduced.matches) animation.goToAndStop(0, true);
      else if (visible && !document.hidden) animation.play();
      else animation.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(element);
    reduced.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);

    // Browser-only import keeps the SVG renderer out of server rendering.
    void import("lottie-web").then(({ default: lottie }) => {
      if (disposed) return;
      animation = lottie.loadAnimation({
        container: element,
        renderer: "svg",
        loop: true,
        autoplay: false,
        path: src,
        rendererSettings: { preserveAspectRatio: "xMidYMid meet" },
      });
      animation.addEventListener("DOMLoaded", update);
      update();
    });

    return () => {
      disposed = true;
      observer.disconnect();
      reduced.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", update);
      animation?.destroy();
    };
  }, [src]);

  return <div ref={container} className={className} aria-hidden="true" />;
}
