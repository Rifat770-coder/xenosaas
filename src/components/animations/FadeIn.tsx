import ScrollReveal, { type RevealProps } from "./ScrollReveal";
// Preserve the existing API while centralizing all section reveal behavior.
export default function FadeIn(props: RevealProps) {
  return <ScrollReveal {...props} />;
}
