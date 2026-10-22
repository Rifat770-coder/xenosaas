import Image from "next/image";
import type { Project } from "@/types";
import DetailDialog from "@/components/ui/DetailDialog";
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <div className="project-image">
        <Image
          src={project.image}
          alt={`${project.title} original interface concept`}
          width={900}
          height={650}
          sizes="(max-width: 767px) 100vw, 50vw"
        />
        <span className="demo-badge">DEMO CONCEPT</span>
        <span className="project-image-index">
          X / {project.id.toUpperCase()}
        </span>
      </div>
      <div className="project-meta">
        <span className="eyebrow">{project.category}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-bottom">
          <div className="tags">
            {project.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <DetailDialog title={project.title} label="View project">
            <p>{project.detail}</p>
          </DetailDialog>
        </div>
      </div>
    </article>
  );
}
