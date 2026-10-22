"use client";

import { useRef, type ComponentProps, type PointerEvent } from "react";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { Code2, PenTool, Workflow, BrainCircuit, Layers, Cloud, ArrowUpRight } from "lucide-react";
import type { Service } from "@/types";
import ServiceVisual from "@/components/sections/services/ServiceVisual";
import styles from "@/components/sections/services/Services.module.css";

const icons = { code: Code2, design: PenTool, workflow: Workflow, ai: BrainCircuit, layers: Layers, cloud: Cloud };

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = icons[service.icon as keyof typeof icons];
  const frame = useRef<HTMLDivElement>(null);
  const bounds = useRef<DOMRect | null>(null);
  const active = useInView(frame, { amount: .05 });
  const revealed = useInView(frame, { amount: .2 });
  const reduced = useReducedMotion();
  const x = useMotionValue(0), y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(springY, [-1, 1], [4, -4]);
  const rotateY = useTransform(springX, [-1, 1], [-5, 5]);
  const layerX = useTransform(springX, [-1, 1], [-9, 9]);
  const layerY = useTransform(springY, [-1, 1], [-6, 6]);
  const spotX = useTransform(springX, [-1, 1], ["0%", "100%"]);
  const spotY = useTransform(springY, [-1, 1], ["0%", "100%"]);
  function allowed(event: PointerEvent<HTMLAnchorElement>) {
    return event.pointerType === "mouse" && !reduced && window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine)").matches;
  }
  function move(event: PointerEvent<HTMLAnchorElement>) {
    if (!allowed(event) || !bounds.current) return;
    const rect = bounds.current;
    const intensity = window.innerWidth < 1024 ? .55 : 1;
    x.set(Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1)) * intensity);
    y.set(Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1)) * intensity);
  }
  function reset() { x.set(0); y.set(0); bounds.current = null; }
  return (
    <div ref={frame} className={styles.frame} data-active={active} data-revealed={revealed} data-accent={service.id === "04" || service.id === "02"}>
      <motion.a href="#contact" className={`service-card ${styles.card}`}
        style={reduced ? undefined : { rotateX, rotateY, "--spot-x": spotX, "--spot-y": spotY } as ComponentProps<typeof motion.a>["style"]}
        onPointerEnter={event => { if (allowed(event)) bounds.current = event.currentTarget.getBoundingClientRect(); }} onPointerMove={move} onPointerLeave={reset} onPointerCancel={reset}>
        <div className={styles.spotlight} aria-hidden="true" />
        <div className={styles.top}><Icon size={28} strokeWidth={1.3} /><span>/{service.id}</span></div>
        <motion.div className={styles.visualDepth} style={reduced ? undefined : { x: layerX, y: layerY }}><div className={styles.visualEntrance}><ServiceVisual type={service.icon} /></div></motion.div>
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        <span className={styles.arrow} aria-label={`Discuss ${service.title}`}><ArrowUpRight size={20} /></span>
      </motion.a>
    </div>
  );
}
