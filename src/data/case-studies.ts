import { projects } from "./projects";

export type CaseStudy = {
  slug: string;
  title: string;
  category: string;
  description: string;
  coverImage: string;
  technologies: string[];
  isDemo: boolean;
  overview: string;
  solution?: string;
  outcome?: string;
  gallery: string[];
};

// Base content remains shared with Selected Work. Only documented demo
// capabilities are summarized here; no client results or process is inferred.
const details: Record<string, Pick<CaseStudy, "solution" | "outcome">> = {
  orbit: {
    solution: "The interface explores clear financial reporting, project visibility, and a focused daily overview.",
    outcome: "This is a design and development showcase, not a delivered client project.",
  },
  flow: {
    solution: "It explores how teams could connect a trigger, an AI processing step, and a human approval into one understandable workflow.",
    outcome: "The preview is illustrative; no live integrations or backend are connected.",
  },
};

export const caseStudies: CaseStudy[] = projects.map(project => ({
  slug: project.id,
  title: project.title,
  category: project.category,
  description: project.description,
  coverImage: project.image,
  technologies: project.tags,
  isDemo: true,
  overview: project.detail,
  gallery: [project.image],
  ...details[project.id],
}));
