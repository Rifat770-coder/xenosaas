"use client";
import { useEffect, useState } from "react";
import IntroReveal from "@/components/animations/IntroReveal";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "@/components/ui/Logo";
import { navigation } from "@/data/navigation";
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 24);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-15% 0px -65% 0px" },
    );
    navigation.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) observer.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", scroll);
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [open]);
  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <IntroReveal className="container nav-inner" duration={0.3} distance={-8}>
        <Logo />
        <nav
          id="main-navigation"
          aria-label="Main navigation"
          className={open ? "nav-links open" : "nav-links"}
        >
          {navigation.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              aria-current={active === n.id ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href="#contact">
          Let’s talk <ArrowUpRight size={16} />
        </a>
        <button
          id="menu-toggle"
          className="menu-toggle"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </IntroReveal>
    </header>
  );
}
