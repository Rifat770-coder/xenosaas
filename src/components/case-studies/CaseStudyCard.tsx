import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/data/case-studies";
import styles from "./CaseStudies.module.css";

export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  return <Link href={`/case-studies/${study.slug}`} className={styles.card} aria-label={`Explore ${study.title}`}>
    <div className={styles.cover}>
      <Image className={styles.coverImage} src={study.coverImage} alt={`${study.title} original interface concept`} width={900} height={650} sizes="(max-width: 767px) 90vw, 46vw" />
      {study.isDemo && <span className={styles.badge}>DEMO CONCEPT</span>}
      <div className={styles.panel}>
        <div className={styles.panelTop}><span>{study.category}</span>{study.isDemo && <small>DEMO CONCEPT</small>}</div>
        <h3>{study.title}</h3>
        <p>{study.description}</p>
        <span className={styles.explore}>Explore <ArrowUpRight size={19} aria-hidden="true" /></span>
      </div>
    </div>
    <div className={styles.meta}>
      <span className={styles.category}>{study.category}</span>
      <h3>{study.title}</h3>
      <p>{study.description}</p>
      <div className={styles.metaBottom}>
        <div className={styles.tags}>{study.technologies.map(technology => <span key={technology}>{technology}</span>)}</div>
        <span className={styles.mobileExplore}>Explore <ArrowUpRight size={16} aria-hidden="true" /></span>
      </div>
    </div>
  </Link>;
}
