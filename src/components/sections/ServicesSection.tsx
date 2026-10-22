import ScrollReveal from "@/components/animations/ScrollReveal";
import Container from "@/components/layout/Container";
import ServiceCard from "@/components/cards/ServiceCard";
import StaggerReveal from "@/components/animations/StaggerReveal";
import { services } from "@/data/services";
import styles from "./services/Services.module.css";
export default function ServicesSection() {
  return (
    <section id="services" className={`section services-section ${styles.section}`}>
      <Container>
        <div className="heading-row">
          <div className={styles.headingBlock}>
            <ScrollReveal distance={16}><div className={styles.eyebrow}><span>03 /</span> WHAT WE DO <i /></div></ScrollReveal>
            <ScrollReveal distance={24} delay={.1}><h2 className={styles.heading}>Digital Expertise.<br /><span>Built Around Your Vision.</span></h2></ScrollReveal>
          </div>
          <ScrollReveal as="p" className="section-aside" delay={0.24}>
            Design, development, and intelligent technology.
            <br />
            Everything your next chapter needs.
          </ScrollReveal>
        </div>
        <StaggerReveal className={`services-grid ${styles.grid}`} interval={.12}>
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </StaggerReveal>
      </Container>
    </section>
  );
}

