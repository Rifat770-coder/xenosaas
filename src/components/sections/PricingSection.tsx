import Container from "@/components/layout/Container";
import StaggerReveal from "@/components/animations/StaggerReveal";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { supportPlans } from "@/data/pricing";
import PricingCard from "./pricing/PricingCard";
import styles from "./pricing/Pricing.module.css";

export default function PricingSection() {
  return (
    <section id="pricing" className={`section ${styles.section}`}>
      <Container>
        <div className={styles.headingBlock}>
          <ScrollReveal distance={16}><div className={styles.eyebrow}><span>03.1 /</span> ONGOING DIGITAL SUPPORT <i /></div></ScrollReveal>
          <ScrollReveal distance={24} delay={.1}><h2 className={styles.heading}>Flexible Plans for<br /><span>Growing Businesses.</span></h2></ScrollReveal>
          <ScrollReveal distance={16} delay={.2}><p className={styles.description}>Choose the right level of digital support for your business, from essential maintenance to ongoing development and automation.</p></ScrollReveal>
        </div>
        <StaggerReveal className={`pricing-grid ${styles.grid}`} delay={.2} interval={.12}>
          {supportPlans.map((plan, index) => <PricingCard key={plan.id} plan={plan} index={index} />)}
        </StaggerReveal>
        <ScrollReveal as="p" className={`content-note ${styles.disclaimer}`} delay={0.3}>
          Proposed ongoing support packages, available by discussion. These are
          not fixed-price website development offers. Scope, availability, and
          terms are confirmed before any engagement.
        </ScrollReveal>
      </Container>
    </section>
  );
}
