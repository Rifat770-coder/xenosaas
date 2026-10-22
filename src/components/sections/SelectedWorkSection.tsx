import ScrollReveal from "@/components/animations/ScrollReveal";
import Container from "@/components/layout/Container";
import { projects } from "@/data/projects";
import FloatingProjectCard from "./selected-work/FloatingProjectCard";
import styles from "./selected-work/SelectedWork.module.css";

export default function SelectedWorkSection() {
  return (
    <section id="work" className={styles.section}>
      <Container>
        <div className={styles.header}>
          <div>
            <ScrollReveal distance={16}><div className={styles.label}><span>01 /</span> SELECTED WORK <i /></div></ScrollReveal>
            <ScrollReveal distance={24} delay={.1}><h2 className={styles.heading}>Selected Work.<br /><span>Real Impact.</span></h2></ScrollReveal>
            <ScrollReveal distance={16} delay={.2}><p className={styles.description}>A glimpse of what happens when thoughtful design meets purposeful technology.</p></ScrollReveal>
          </div>
          <ScrollReveal as="p" className={styles.aside} distance={16} delay={.24}>Original concepts. Real capabilities.<br />Explore our demonstration projects.</ScrollReveal>
        </div>
        <div className={styles.grid}>{projects.map((project, index) => <FloatingProjectCard key={project.id} project={project} index={index} />)}</div>
        <ScrollReveal as="p" className={styles.note} distance={16} delay={.24}>All projects shown are demonstration concepts, not commissioned client work.</ScrollReveal>
      </Container>
    </section>
  );
}
