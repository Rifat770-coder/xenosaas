import ScrollReveal from "@/components/animations/ScrollReveal";
import Container from "@/components/layout/Container";
import StaggerReveal from "@/components/animations/StaggerReveal";
import CaseStudyCard from "@/components/case-studies/CaseStudyCard";
import { caseStudies } from "@/data/case-studies";
import styles from "@/components/case-studies/CaseStudies.module.css";

export default function CaseStudiesSection() {
  return (
    <section id="case-studies" className={`section ${styles.section}`}>
      <Container>
        <div className="heading-row">
          <div className={styles.headingBlock}>
            <ScrollReveal distance={16}><div className={styles.eyebrow}><span>02 /</span> CASE STUDIES <i /></div></ScrollReveal>
            <ScrollReveal distance={24} delay={.1}><h2 className={styles.heading}>The Work<br /><span>Behind the Work.</span></h2></ScrollReveal>
            <ScrollReveal distance={16} delay={.2}><p className={styles.description}>A closer look at the thinking, process, and outcomes behind each demonstration project.</p></ScrollReveal>
          </div>
          <ScrollReveal as="p" className="section-aside" delay={0.24}>Concept to concept.<br />Explore the detail behind each project.</ScrollReveal>
        </div>
        <StaggerReveal className={`${styles.grid} ${caseStudies.length === 2 ? styles.pair : ""}`} interval={.12} scale={.98}>
          {caseStudies.map(study => <CaseStudyCard key={study.slug} study={study} />)}
        </StaggerReveal>
        <ScrollReveal as="p" className="content-note" delay={0.24}>All case studies shown are demonstration concepts, not commissioned client work.</ScrollReveal>
      </Container>
    </section>
  );
}
