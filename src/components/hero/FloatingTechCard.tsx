import {
  Code2,
  Workflow,
  Cloud,
  PenTool,
  Check,
  ArrowRight,
} from "lucide-react";
export default function FloatingTechCard({
  kind,
}: {
  kind: "web" | "design" | "ai" | "saas";
}) {
  const icons = { web: Code2, design: PenTool, ai: Workflow, saas: Cloud };
  const Icon = icons[kind];
  const labels = {
    web: "Web Development",
    design: "UI/UX Design",
    ai: "AI Automation",
    saas: "SaaS Solutions",
  };
  return (
    <div className={`tech-card tech-${kind}`}>
      <div className="tech-label">
        <Icon size={14} />
        <span>{labels[kind]}</span>
        <span className="tiny-dot" />
      </div>
      {kind === "web" ? (
        <div className="code-preview">
          <span>
            <b>&lt;build</b> theFuture<span className="code-white">=</span>
          </span>
          <span className="indent">
            possibilities<span className="code-white">=</span>
            <em>&quot;endless&quot;</em>
          </span>
          <span>
            <b>/&gt;</b>
            <i className="cursor" />
          </span>
        </div>
      ) : kind === "design" ? (
        <div className="design-preview">
          <div className="wireframe">
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="swatches">
            <i />
            <i />
            <i />
            <i />
          </div>
          <span>Thoughtfully crafted.</span>
        </div>
      ) : kind === "ai" ? (
        <div className="workflow-preview">
          <span>
            <Workflow size={18} />
          </span>
          <ArrowRight size={13} />
          <span className="ai-node">✦</span>
          <ArrowRight size={13} />
          <span>
            <Check size={18} />
          </span>
          <small>Connected. Intelligent. Automated.</small>
        </div>
      ) : (
        <div className="saas-preview">
          <div className="mini-bars">
            {[35, 50, 42, 70, 58, 90, 78, 100].map((n, i) => (
              <i key={i} style={{ height: `${n}%` }} />
            ))}
          </div>
          <span>Built to scale. Ready to grow.</span>
        </div>
      )}
    </div>
  );
}
