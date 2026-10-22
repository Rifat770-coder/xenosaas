"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import Container from "@/components/layout/Container";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TestimonialCard from "@/components/cards/TestimonialCard";
import { testimonials } from "@/data/testimonials";
import styles from "./TestimonialsSection.module.css";

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (testimonials.length < 2) return;

    const timer = window.setTimeout(() => {
      setDirection(1);
      setIndex(current => (current + 1) % testimonials.length);
    }, 3000);

    return () => window.clearTimeout(timer);
  }, [index]);

  function select(next: number, movement: number) {
    setDirection(movement);
    setIndex((next + testimonials.length) % testimonials.length);
  }
  const move = (amount: number) => select(index + amount, amount);
  const easing = [0.22, 1, 0.36, 1] as const;
  return (
    <section id="testimonials" className={styles.section}>
      <Container>
        <div className={styles.header}>
          <ScrollReveal distance={16}><div className={styles.label}><span>04 /</span> CLIENT FEEDBACK</div></ScrollReveal>
          <ScrollReveal distance={24} delay={.1}><h2>What Our Clients<br /><span>Say About Us.</span></h2></ScrollReveal>
          <ScrollReveal distance={16} delay={.2}><p>Meaningful experiences. Lasting partnerships.</p></ScrollReveal>
        </div>
        <div role="region" aria-roledescription="carousel" aria-label="Sample testimonials" tabIndex={0} className={styles.carousel}
          onKeyDown={event => {
            if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
            if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
          }}>
          <ScrollReveal distance={32} scale={.98} delay={.24}>
            <div className={styles.card}>
              <div className={styles.cardTop}>
                <Quote size={46} strokeWidth={1.3} aria-hidden="true" />
                <div className={styles.counter} aria-hidden="true"><motion.span key={index} initial={{ opacity: reduced ? 1 : 0 }} animate={{ opacity: 1 }} transition={{ duration: .3 }}>{String(index + 1).padStart(2, "0")}</motion.span><span>/ {String(testimonials.length).padStart(2, "0")}</span></div>
              </div>
              <div className={styles.slides} aria-live="polite" aria-atomic="true">
                <AnimatePresence initial={false} custom={direction} mode="sync">
                  <motion.div className={styles.slide} key={index} custom={direction}
                    variants={{ enter: (d: number) => ({ opacity: 0, x: reduced ? 0 : d * 20 }), visible: { opacity: 1, x: 0 }, exit: (d: number) => ({ opacity: 0, x: reduced ? 0 : d * -20, transition: { duration: reduced ? 0 : .2, ease: easing } }) }}
                    initial="enter" animate="visible" exit="exit" transition={{ duration: reduced ? 0 : .5, ease: easing }}>
                    <TestimonialCard index={index} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal distance={16} delay={.38}>
            <div className={styles.navigation}>
              <div className={styles.arrows}>
                <button type="button" aria-label="Previous testimonial" onClick={() => move(-1)}><ArrowLeft size={19} /></button>
                <button type="button" aria-label="Next testimonial" onClick={() => move(1)}><ArrowRight size={19} /></button>
              </div>
              <div className={styles.progress} role="group" aria-label="Choose testimonial">
                {testimonials.map((testimonial, item) => <button type="button" key={testimonial.name} aria-label={`Show testimonial ${item + 1}`} aria-current={index === item ? "true" : undefined} onClick={() => select(item, item >= index ? 1 : -1)}><span data-active={index === item} /></button>)}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
