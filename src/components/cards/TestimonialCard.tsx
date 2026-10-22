import { testimonials } from "@/data/testimonials";
import styles from "@/components/sections/TestimonialsSection.module.css";

export default function TestimonialCard({ index }: { index: number }) {
  const testimonial = testimonials[index];
  return (
    <div className={styles.content}>
      <blockquote>{testimonial.quote}</blockquote>
      <div className={styles.person}>
        <span className={styles.avatar} aria-hidden="true">X</span>
        <div><strong>{testimonial.name}</strong><p>{testimonial.role} &middot; {testimonial.company}</p></div>
      </div>
      <p className={styles.demo}>{testimonial.label}</p>
    </div>
  );
}
