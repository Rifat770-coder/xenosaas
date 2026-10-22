"use client";

import { useEffect } from "react";
import { stagger, useAnimate, useInView, useReducedMotion } from "motion/react";
import { blogs } from "@/data/blogs";
import BlogCard from "@/components/cards/BlogCard";
import styles from "./InteractiveBlogCards.module.css";

export default function InteractiveBlogGrid() {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const visible = useInView(scope, { once: true, amount: .12 });
  const reduced = useReducedMotion();
  useEffect(() => {
    const element = scope.current;
    if (!element) return;
    const cards = Array.from(element.children);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const animation = animate(cards, { opacity: 1, y: 0, scale: 1 }, { duration: 0 });
      return () => animation.stop();
    }
    if (!visible) {
      const animation = animate(cards, { opacity: 0, y: 30, scale: .97 }, { duration: 0 });
      return () => animation.stop();
    }
    const animation = animate(cards, { opacity: [0, 1], y: [30, 0], scale: [.97, 1] }, {
      duration: .65, delay: stagger(.12, { startDelay: .12 }), ease: [.22, 1, .36, 1],
    });
    return () => animation.stop();
  }, [animate, scope, visible, reduced]);
  return <div ref={scope} className={`blog-grid ${styles.grid}`}>
    {blogs.map(blog => <div className={styles.reveal} key={blog.id}><BlogCard blog={blog} /></div>)}
  </div>;
}
