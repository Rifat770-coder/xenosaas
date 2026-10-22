"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { Check, ArrowUpRight } from "lucide-react";
import type { PricingPlan } from "@/data/pricing";
import styles from "./Pricing.module.css";

export default function PricingCard({ plan, index }: { plan: PricingPlan; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const active = useInView(ref, { amount: .05 });
  const price = plan.priceUSD === null ? (plan.priceLabel ?? "Custom Quote") : new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(plan.priceUSD);
  return <div ref={ref} className={`${styles.shell} ${plan.featured ? styles.featured : ""}`} data-active={active}>
    <article className={`pricing-card ${styles.card}`}>
      <div className={styles.planTop}><span>0{index + 1} / {plan.id.toUpperCase()}</span>{plan.featured && <span className={`pricing-badge ${styles.badge}`}>Recommended</span>}</div>
      <h3>{plan.name}</h3>
      <div className={styles.price}>
        <strong data-custom={plan.priceUSD === null}>{price}</strong>
        {plan.priceUSD !== null && plan.billingPeriod !== "custom" && <span className={styles.period}>/{plan.billingPeriod}</span>}
      </div>
      <span className={styles.priceNote}>{plan.priceUSD === null && plan.billingPeriod !== "custom" ? "USD pricing pending approval" : "Scope and service cadence agreed together"}</span>
      <p className={styles.description}>{plan.description}</p>
      <ul>{plan.features.map(feature => <li key={feature}><Check size={15} aria-hidden="true" /><span>{feature}</span></li>)}</ul>
      <a className={styles.cta} data-featured={plan.featured} href={plan.ctaHref} aria-label={plan.ctaLabel === "Contact Sales" ? `Contact sales for ${plan.name}` : `Get started with ${plan.name}`}>
        {plan.ctaLabel}<ArrowUpRight size={17} aria-hidden="true" />
      </a>
    </article>
  </div>;
}

