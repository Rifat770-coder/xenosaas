"use client";
import useEntrance from "@/hooks/useEntrance";
import HeroDashboard from "./HeroDashboard";
export default function HeroVisual() {
  const scope = useEntrance({
    delay: 1.2,
    duration: 0.8,
    distance: 65,
    scale: 0.96,
    rotateX: 8,
  });
  return (
    <div
      ref={scope}
      className="hero-visual cinematic-visual"
      role="img"
      aria-label="Original XenoSaas demo workspace showing project analytics, a connected automation workflow, and UI design components. All figures are illustrative."
    >
      <div aria-hidden="true">
        <HeroDashboard />
      </div>
    </div>
  );
}
