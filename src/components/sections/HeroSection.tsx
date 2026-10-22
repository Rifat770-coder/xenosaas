"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import { ArrowUpRight, Cloud, CodeXml, PenTool, MoreHorizontal, Workflow } from "lucide-react";
import styles from "./HeroSection.module.css";
import AnimatedDataFlow from "@/components/hero/AnimatedDataFlow";
import DevelopmentAnimation from "@/components/hero/DevelopmentAnimation";
import WorkspaceReveal from "@/components/hero/WorkspaceReveal";

const capabilities = [
  { title: "Web Development", description: "Scalable Web Apps", icon: CodeXml },
  { title: "UI/UX Design", description: "Seamless Experiences", icon: PenTool },
  { title: "AI Automation", description: "Smart Workflows", icon: Workflow },
  { title: "SaaS Solutions", description: "Digital Products", icon: Cloud },
];

function CapabilityGraphic({ index }: { index: number }) {
  if (index === 0) return <DevelopmentAnimation className={`${styles.artwork} ${styles.developmentAnimation}`} />;
  if (index === 1) return <DevelopmentAnimation className={`${styles.artwork} ${styles.designAnimation}`} src="/illustration%20UIUX%20design.json" />;
  if (index === 2) return <DevelopmentAnimation className={`${styles.artwork} ${styles.aiAnimation}`} src="/Ai-powered%20marketing%20tools%20abstract.json" />;
  return <DevelopmentAnimation className={`${styles.artwork} ${styles.saasAnimation}`} src="/cloud%20computing.json" />;
}

export default function HeroSection() {
  const hero = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = hero.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      element.dataset.visible = String(entry.isIntersecting);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  function highlight(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
  }
  return (
    <section ref={hero} id="home" className={styles.hero} aria-labelledby="hero-heading">
      <AnimatedDataFlow />
      <div className={styles.inner}>
        <div className={styles.copy}>
          <a className={styles.badge} href="#services">
            <span className={styles.dot} /> YOUR DIGITAL INNOVATION PARTNER
            <ArrowUpRight size={12} aria-hidden="true" />
          </a>
          <h1 id="hero-heading" className={styles.heading}>
            <span>We Build Intelligent</span>
            <span>Digital Experiences.</span>
          </h1>
          <p className={styles.description}>
            Web Development &bull; UI/UX Design &bull; AI Automation &bull; SaaS Solutions
          </p>
          <div className={styles.actions}>
            <a className={styles.primary} href="#work">Explore Our Work <ArrowUpRight size={16} aria-hidden="true" /></a>
            <a className={styles.secondary} href="#contact">Let&apos;s Talk <ArrowUpRight size={16} aria-hidden="true" /></a>
          </div>
        </div>
        <WorkspaceReveal>
        <div className={styles.workspace} aria-label="XenoSaas Digital Workspace">
          <div className={styles.toolbar}>
            <span><i className={styles.status} />XenoSaas Digital Workspace</span>
            <MoreHorizontal size={21} aria-hidden="true" />
          </div>
          <div className={styles.grid}>
            {capabilities.map(({ title, description, icon: Icon }, index) => (
              <div className={styles.card} key={title} onPointerMove={highlight} data-workspace-card>
                <div className={styles.cardTop}>
                  <Icon className={styles.icon} size={23} strokeWidth={1.8} aria-hidden="true" />
                  <span className={styles.cardNumber} aria-hidden="true">0{index + 1}</span>
                </div>
                <CapabilityGraphic index={index} />
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>
        </WorkspaceReveal>
      </div>
    </section>
  );
}



