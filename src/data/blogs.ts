import type { Blog } from "@/types";
export const blogs: Blog[] = [
  {
    id: "web",
    title: "The future of the web is an experience.",
    category: "DEVELOPMENT",
    excerpt:
      "Why speed, accessibility, and thoughtful interactions belong in every modern website.",
    image: "/images/blogs/web.svg",
    body: "The most useful websites balance visual character with reliable fundamentals. Start with semantic HTML, fast-loading media, and clear navigation. Add interactions when they help people understand or complete a task. A future-ready website is one that remains usable across devices, adapts to content changes, and makes space for accessibility from the first sketch. This is an editorial preview, not a published article.",
  },
  {
    id: "ai",
    title: "Make room for what matters. Automate the rest.",
    category: "AI & AUTOMATION",
    excerpt:
      "A practical starting point for bringing intelligent automation into everyday work.",
    image: "/images/blogs/ai.svg",
    body: "Begin automation with a repeatable task that has clear inputs and outcomes. Map the current process before choosing a tool. Introduce a human review step where judgment matters, and measure whether the workflow actually saves effort. AI can assist with classification and drafting, while explicit rules keep the process understandable. This is an editorial preview, not a published article.",
  },
  {
    id: "design",
    title: "Good design is good business. Here’s why.",
    category: "DESIGN",
    excerpt:
      "The small interface decisions that build clarity, confidence, and connection.",
    image: "/images/blogs/design.svg",
    body: "A clear interface helps people understand what they can do and what happens next. Consistent labels, readable typography, visible feedback, and accessible controls remove friction. Start with the user's task, sketch the shortest useful path, and test it with real people. Visual polish works best when it supports that foundation. This is an editorial preview, not a published article.",
  },
];
