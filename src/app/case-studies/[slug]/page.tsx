import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import ScrollReveal from "@/components/animations/ScrollReveal";
import CaseStudyChrome from "@/components/case-studies/CaseStudyChrome";
import { caseStudies } from "@/data/case-studies";
import { site } from "@/config/site";
import styles from "@/components/case-studies/CaseStudies.module.css";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return caseStudies.map(study => ({ slug: study.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies.find(item => item.slug === slug);
  if (!study) return { title: "Case study not found | XenoSaas" };
  return { title: `${study.title} | XenoSaas Case Study`, description: study.description, alternates: { canonical: `/case-studies/${study.slug}` }, openGraph: { title: study.title, description: study.description, images: [{ url: study.coverImage, width: 900, height: 650, alt: `${study.title} demo concept` }] } };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = caseStudies.find(item => item.slug === slug);
  if (!study) notFound();
  const next = caseStudies[(caseStudies.indexOf(study) + 1) % caseStudies.length];
  return <CaseStudyChrome>
    <Navbar />
    <main id="main" className={styles.detail}>
      <section id="case-studies" className={styles.hero}>
        <Container>
          <Link className={styles.back} href="/#case-studies"><ArrowLeft size={15} /> All case studies</Link>
          <div className={styles.detailEyebrow}><span>CASE STUDY / {study.slug.toUpperCase()}</span><span className={styles.demoLabel}>DEMO CONCEPT</span></div>
          <h1>{study.title}</h1>
          <p className={styles.heroDescription}>{study.description}</p>
          <div className={styles.heroMeta}><span>{study.category}</span><div className={styles.tags}>{study.technologies.map(tag => <span key={tag}>{tag}</span>)}</div></div>
          <div className={styles.heroImage}><Image src={study.coverImage} alt={`${study.title} original demonstration interface`} width={900} height={650} sizes="90vw" preload /></div>
        </Container>
      </section>
      <Container>
        <div className={styles.detailContent}>
          <aside className={styles.contents} aria-label="Case study contents"><span>INSIDE THE CONCEPT</span><a href={`#overview`}>01 / Overview</a>{study.solution && <a href="#solution">02 / The solution</a>}<a href="#gallery">03 / Interface preview</a>{study.outcome && <a href="#outcome">04 / Demonstrated scope</a>}<a href="#technologies">05 / Technologies</a></aside>
          <div className={styles.narrative}>
            <ScrollReveal distance={24}><section id="overview" className={styles.chapter}><span>01 / PROJECT OVERVIEW</span><h2>The project, in context.</h2><p>{study.overview}</p></section></ScrollReveal>
            {study.solution && <ScrollReveal distance={24}><section id="solution" className={styles.chapter}><span>02 / THE SOLUTION</span><h2>What the concept explores.</h2><p>{study.solution}</p></section></ScrollReveal>}
            <ScrollReveal distance={24}><section id="gallery" className={styles.chapter}><span>03 / PROJECT GALLERY</span><h2>Inside the interface.</h2>{study.gallery.map((image, index) => <figure className={styles.gallery} key={`${image}-${index}`}><Image src={image} alt={`${study.title} interface preview ${index + 1}`} width={900} height={650} sizes="(max-width: 767px) 90vw, 65vw" /><figcaption>Original demonstration concept interface.</figcaption></figure>)}</section></ScrollReveal>
            {study.outcome && <ScrollReveal distance={24}><section id="outcome" className={styles.chapter}><span>04 / DEMONSTRATED SCOPE</span><h2>A concept, clearly defined.</h2><p>{study.outcome}</p><p className={styles.scopeNote}>Demonstration project. Not a commissioned client engagement.</p></section></ScrollReveal>}
            <ScrollReveal distance={24}><section id="technologies" className={styles.chapter}><span>05 / TECHNOLOGIES USED</span><h2>The project stack.</h2><div className={styles.technologyList}>{study.technologies.map(tag => <span key={tag}>{tag}</span>)}</div></section></ScrollReveal>
          </div>
        </div>
        <ScrollReveal distance={24}><div className={styles.detailBottom}>
          <Link className={styles.nextProject} href={`/case-studies/${next.slug}`}><small>NEXT PROJECT</small><span>{next.title}<ArrowUpRight size={26} /></span></Link>
          <div className={styles.contact}><span>HAVE A SIMILAR IDEA?</span><h2>Let&apos;s build your next chapter.</h2><a href={`${site.whatsapp}?text=${encodeURIComponent(`I'd like to discuss a project inspired by ${study.title}`)}`}>Discuss your project <ArrowUpRight size={17} /></a></div>
        </div></ScrollReveal>
      </Container>
    </main>
    <Footer />
  </CaseStudyChrome>;
}


