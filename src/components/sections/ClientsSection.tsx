import ScrollReveal from "@/components/animations/ScrollReveal";
import Container from "@/components/layout/Container";
import ClientMarquee from "./clients/ClientMarquee";
import styles from "./clients/ClientMarquee.module.css";

export default function ClientsSection() {
  return (
    <section id="clients" className={`section clients-section ${styles.section}`}>
      <Container>
        <div className={styles.headingBlock}>
          <ScrollReveal distance={16}>
            <div className={styles.eyebrow}><span>02 /</span> OUR CLIENTS <i /></div>
          </ScrollReveal>
          <ScrollReveal distance={24} delay={.1}>
            <h2 className={styles.heading}>Building Relationships.<br /><span>Through Technology.</span></h2>
          </ScrollReveal>
          <ScrollReveal distance={16} delay={.2}>
            <p className={styles.description}>Building relationships through technology, shared ambition, and a little curiosity.</p>
          </ScrollReveal>
        </div>
        <ClientMarquee />
        <ScrollReveal as="p" className="content-note" delay={0.24}>
          Client partnerships and collaborations will be featured here. These
          are placeholder spaces.
        </ScrollReveal>
      </Container>
    </section>
  );
}
