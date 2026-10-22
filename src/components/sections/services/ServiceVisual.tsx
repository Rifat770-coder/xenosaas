import DevelopmentAnimation from "@/components/hero/DevelopmentAnimation";
import styles from "./Services.module.css";

const animations: Record<string, string> = {
  code: "/development-icon.lottie.json",
  design: "/illustration%20UIUX%20design.json",
  workflow: "/Ai-powered%20marketing%20tools%20abstract.json",
  ai: "/artificial%20intelligence.json",
  layers: "/code-gear-animation.json",
  cloud: "/cloud%20computing.json",
};

export default function ServiceVisual({ type }: { type: string }) {
  return <DevelopmentAnimation className={`${styles.serviceAnimation} ${type === "design" || type === "layers" ? styles.largeAnimation : ""}`} src={animations[type]} />;
}
