import StaggerReveal from "@/components/animations/StaggerReveal";
export default function SectionHeading({
  number,
  eyebrow,
  title,
  description,
}: {
  number: string;
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <StaggerReveal
      className="section-heading"
      interval={0.12}
      delay={0}
      scale={1}
    >
      <div className="eyebrow">
        <span>{number} /</span> {eyebrow}
      </div>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </StaggerReveal>
  );
}
