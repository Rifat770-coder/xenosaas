import type { Project } from "@/types";
export const projects: Project[] = [
  {
    id: "orbit",
    title: "Orbit — Business, in sync.",
    category: "SAAS PLATFORM / PRODUCT DESIGN",
    description:
      "A calmer way to manage the moving parts of a growing business.",
    image: "/images/projects/orbit.svg",
    tags: ["Next.js", "TypeScript", "UI/UX"],
    detail:
      "Orbit is an original demonstration concept for a unified business workspace. The interface explores clear financial reporting, project visibility, and a focused daily overview. This is a design and development showcase, not a delivered client project.",
  },
  {
    id: "flow",
    title: "Flow — Less busywork. More possibility.",
    category: "AI AUTOMATION / WEB APPLICATION",
    description:
      "Connecting everyday tools into one intelligent, effortless workflow.",
    image: "/images/projects/flow.svg",
    tags: ["React", "Automation", "AI Integration"],
    detail:
      "Flow is an original demonstration concept for visual business automation. It explores how teams could connect a trigger, an AI processing step, and a human approval into one understandable workflow. The preview is illustrative; no live integrations or backend are connected.",
  },
];
