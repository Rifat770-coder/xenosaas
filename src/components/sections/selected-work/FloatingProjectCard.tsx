"use client";

import { useRef, type PointerEvent } from "react";
import Image from "next/image";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { ArrowUpRight, CodeXml, Layers, LockKeyhole } from "lucide-react";
import DetailDialog from "@/components/ui/DetailDialog";
import useScrollReveal from "@/hooks/useScrollReveal";
import type { Project } from "@/types";
import styles from "./SelectedWork.module.css";

export default function FloatingProjectCard({ project, index }: { project: Project; index: number }) {
  const scope = useScrollReveal({ distance: 40, scale: .97, delay: .12 + index * .16 });
  const inView = useInView(scope, { amount: .2 });
  const active = useInView(scope, { amount: .05 });
  const reduced = useReducedMotion();
  const bounds = useRef<DOMRect | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 24 });
  const sy = useSpring(y, { stiffness: 150, damping: 24 });
  const rotateX = useTransform(sy, [-1, 1], [5, -5]);
  const rotateY = useTransform(sx, [-1, 1], [-5, 5]);
  const nearX = useTransform(sx, [-1, 1], [-12, 12]);
  const nearY = useTransform(sy, [-1, 1], [-8, 8]);
  const farX = useTransform(sx, [-1, 1], [-6, 6]);
  const farY = useTransform(sy, [-1, 1], [-5, 5]);
  const glowX = useTransform(sx, [-1, 1], ["20%", "80%"]);
  const glowY = useTransform(sy, [-1, 1], ["20%", "80%"]);
  const allowed = (event: PointerEvent<HTMLElement>) => event.pointerType === "mouse" && !reduced && window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 768px)").matches;
  function move(event: PointerEvent<HTMLElement>) {
    if (!allowed(event) || !bounds.current) return;
    const r = bounds.current;
    const intensity = window.innerWidth < 1100 ? .6 : 1;
    x.set(Math.max(-1, Math.min(1, (event.clientX - r.left) / r.width * 2 - 1)) * intensity);
    y.set(Math.max(-1, Math.min(1, (event.clientY - r.top) / r.height * 2 - 1)) * intensity);
  }
  function reset() { x.set(0); y.set(0); bounds.current = null; }
  return (
    <article ref={scope} className={styles.card} data-revealed={inView} data-active={active} data-tone={index % 2 ? "red" : "blue"}
      onPointerEnter={event => { if (allowed(event)) bounds.current = event.currentTarget.getBoundingClientRect(); }} onPointerMove={move} onPointerLeave={reset} onPointerCancel={reset}>
      <motion.div className={styles.visual} style={{ "--glow-x": glowX, "--glow-y": glowY } as React.ComponentProps<typeof motion.div>["style"]}>
        <div className={styles.halo} aria-hidden="true" />
        <div className={styles.backWindow} aria-hidden="true"><span /><span /><span /></div>
        <motion.div className={styles.browserTilt} style={reduced ? undefined : { rotateX, rotateY }}>
          <div className={styles.browser}>
            <div className={styles.browserToolbar} aria-hidden="true">
              <span className={styles.windowControls}><i /><i /><i /></span>
              <span className={styles.address}><LockKeyhole size={9} /> {project.id} / preview</span>
              <ArrowUpRight size={12} />
            </div>
            <div className={styles.imageMask}>
              <Image className={styles.image} src={project.image} alt={`${project.title} original interface concept`} width={900} height={650} sizes="(max-width: 767px) 90vw, 44vw" />
            </div>
          </div>
        </motion.div>
        <motion.div className={styles.panelNear} style={reduced ? undefined : { x: nearX, y: nearY }}>
          <div className={styles.floatingPanel}><span className={styles.panelIcon}><CodeXml size={15} /></span><div><small>BUILT WITH</small><strong>{project.tags[0]}</strong></div><span className={styles.panelDot} /></div>
        </motion.div>
        <motion.div className={styles.panelFar} style={reduced ? undefined : { x: farX, y: farY }}>
          <div className={styles.floatingPanel}><Layers size={15} /><div><small>{project.tags[1]}</small><strong>{project.tags[2]}</strong></div></div>
        </motion.div>
        <span className={styles.demo}>DEMO CONCEPT</span>
        <span className={styles.visualIndex}>X / {project.id.toUpperCase()}</span>
      </motion.div>
      <div className={styles.info}>
        <div className={styles.category}><span>0{index + 1}</span>{project.category}</div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className={styles.bottom}>
          <div className={styles.tags}>{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
          <DetailDialog title={project.title} label="View project"><p>{project.detail}</p></DetailDialog>
        </div>
      </div>
    </article>
  );
}



