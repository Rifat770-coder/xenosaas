"use client";
import useEntrance from "@/hooks/useEntrance";
export default function HeroOrbitalGlow() {
  const scope = useEntrance({
    delay: 1,
    duration: 0.8,
    distance: 0,
    scale: 0.88,
  });
  return (
    <div ref={scope} className="orbital-entrance" aria-hidden="true">
      <div className="orbital-light" />
      <div className="orbital-ring orbital-ring-outer" />
      <div className="orbital-ring orbital-ring-inner" />
      <div className="orbital-horizon" />
    </div>
  );
}
