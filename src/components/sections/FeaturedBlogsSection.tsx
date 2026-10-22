import Container from "@/components/layout/Container";
import ScrollReveal from "@/components/animations/ScrollReveal";
import InteractiveBlogGrid from "./blogs/InteractiveBlogGrid";
import styles from "./blogs/InteractiveBlogCards.module.css";

export default function FeaturedBlogsSection() {
  return (
    <section id="blogs" className={`section ${styles.section}`}>
      <Container>
        <div className={styles.headingBlock}>
          <ScrollReveal distance={16}><div className={styles.eyebrow}><span>05 /</span> FROM OUR NOTEBOOK <i /></div></ScrollReveal>
          <ScrollReveal distance={24} delay={.1}><h2 className={styles.heading}>Ideas, Insights<br /><span>&amp; Innovation.</span></h2></ScrollReveal>
          <ScrollReveal distance={16} delay={.2}><p className={styles.description}>Perspectives on the design, development, and technology shaping tomorrow.</p></ScrollReveal>
        </div>
        <InteractiveBlogGrid />
      </Container>
    </section>
  );
}
