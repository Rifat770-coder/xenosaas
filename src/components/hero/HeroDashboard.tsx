import {
  ArrowUpRight,
  Check,
  Code2,
  Workflow,
  Layers,
  LayoutDashboard,
  BarChart3,
  Settings2,
  Command,
  ChevronDown,
  Plus,
  Search,
  ArrowRight,
  BrainCircuit,
} from "lucide-react";
const activities = [
  {
    name: "Website experience",
    detail: "Design system & development",
    icon: Code2,
    progress: 82,
  },
  {
    name: "Intelligent workflows",
    detail: "Connected tools, fewer tasks",
    icon: Workflow,
    progress: 64,
  },
  {
    name: "Product workspace",
    detail: "A clearer view of your business",
    icon: Layers,
    progress: 91,
  },
];
export default function HeroDashboard() {
  return (
    <div className="dashboard-composition">
      <div className="dashboard-panel">
        <aside className="dashboard-sidebar">
          <div className="dashboard-brand">
            <span className="dashboard-mark">X</span>
            <span>
              xeno<span>space</span>
            </span>
          </div>
          <div className="workspace-switch">
            <span className="workspace-avatar">XS</span>
            <span>
              Your workspace<small>Demo environment</small>
            </span>
            <ChevronDown size={12} />
          </div>
          <div className="dashboard-nav">
            <span className="selected">
              <LayoutDashboard />
              Overview
            </span>
            <span>
              <Layers />
              Projects
            </span>
            <span>
              <Workflow />
              Automations
            </span>
            <span>
              <BarChart3 />
              Insights
            </span>
          </div>
          <div className="sidebar-bottom">
            <span>
              <Settings2 size={13} />
              Workspace settings
            </span>
            <div>
              <span className="tiny-dot" /> Everything, connected.
            </div>
          </div>
        </aside>
        <div className="dashboard-main">
          <div className="dashboard-toolbar">
            <span>
              Workspace <span>/ Overview</span>
            </span>
            <div>
              <Search size={13} />
              <Command size={12} />
              <span className="workspace-avatar">XS</span>
            </div>
          </div>
          <div className="dashboard-content">
            <div className="dashboard-title">
              <div>
                <span className="dashboard-eyebrow">
                  A LITTLE CLARITY FOR YOUR EVERYDAY
                </span>
                <h3>
                  Your next big thing starts here<span>.</span>
                </h3>
                <p>A connected space for ideas, projects, and possibilities.</p>
              </div>
              <span className="new-project">
                <Plus size={12} />
                New project
              </span>
            </div>
            <div className="dashboard-stats">
              {[
                {
                  label: "Active projects",
                  value: "12",
                  caption: "Ideas moving forward",
                },
                {
                  label: "Workflows connected",
                  value: "08",
                  caption: "Less busy. More possibility.",
                },
                {
                  label: "Tasks completed",
                  value: "84",
                  caption: "Room for what matters",
                },
              ].map((s, i) => (
                <div key={s.label}>
                  <span>
                    {s.label}
                    <ArrowUpRight size={12} />
                  </span>
                  <strong>
                    {s.value}
                    <small>{i === 1 ? "AUTOMATE" : "CREATE"}</small>
                  </strong>
                  <p>{s.caption}</p>
                </div>
              ))}
            </div>
            <div className="dashboard-lower">
              <div className="dashboard-chart">
                <div className="dashboard-widget-heading">
                  <h4>Momentum overview</h4>
                  <span>
                    This week <ChevronDown size={10} />
                  </span>
                </div>
                <div className="chart-inner">
                  <div className="chart-labels">
                    <span>100</span>
                    <span>75</span>
                    <span>50</span>
                    <span>25</span>
                  </div>
                  <svg
                    viewBox="0 0 460 155"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient
                        id="momentum-fill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop stopColor="var(--chart-series-1)" stopOpacity=".25" />
                        <stop offset="1" stopColor="var(--chart-series-1)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {[20, 60, 100, 140].map((y) => (
                      <path
                        key={y}
                        d={`M0 ${y}H460`}
                        stroke="rgb(var(--border-default-rgb) / 0.101960784)"
                        strokeDasharray="3 5"
                      />
                    ))}
                    <path
                      d="M0 133C30 133 39 90 70 98S106 120 138 78S184 98 215 70S255 86 285 49S332 68 362 30S413 43 460 10V155H0Z"
                      fill="url(#momentum-fill)"
                    />
                    <path
                      className="momentum-line"
                      d="M0 133C30 133 39 90 70 98S106 120 138 78S184 98 215 70S255 86 285 49S332 68 362 30S413 43 460 10"
                      fill="none"
                      stroke="var(--chart-series-1)"
                      strokeWidth="2.5"
                    />
                    <circle cx="460" cy="10" r="4" fill="var(--chart-series-1)" />
                  </svg>
                </div>
                <div className="chart-days">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                    (d) => (
                      <span key={d}>{d}</span>
                    ),
                  )}
                </div>
              </div>
              <div className="dashboard-projects">
                <div className="dashboard-widget-heading">
                  <h4>In the making</h4>
                  <ArrowUpRight size={12} />
                </div>
                {activities.map((a) => (
                  <div className="dashboard-project" key={a.name}>
                    <a.icon size={14} />
                    <div>
                      <strong>{a.name}</strong>
                      <span>{a.detail}</span>
                      <i>
                        <i style={{ width: `${a.progress}%` }} />
                      </i>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="dashboard-status">
              <span>
                <span className="tiny-dot" /> Designed to work. Built to
                connect.
              </span>
              <span>ILLUSTRATIVE DATA / DEMO INTERFACE</span>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-float float-workflow">
        <div className="float-card-label">
          <Workflow size={13} /> AUTOMATION, IN MOTION{" "}
          <span className="tiny-dot" />
        </div>
        <div className="floating-flow">
          <span>
            <Code2 size={16} />
          </span>
          <ArrowRight size={13} />
          <span className="brain-node">
            <BrainCircuit size={18} />
          </span>
          <ArrowRight size={13} />
          <span>
            <Check size={16} />
          </span>
        </div>
        <div className="float-caption">One workflow. Endless possibility.</div>
      </div>
      <div className="dashboard-float float-design">
        <div className="float-card-label">
          <Layers size={13} /> MADE TO FEEL RIGHT
        </div>
        <div className="design-system-preview">
          <span>Aa</span>
          <div>
            <i />
            <i />
            <i />
          </div>
        </div>
        <div className="float-caption">
          <Check size={10} /> A cohesive design language
        </div>
      </div>
      <div className="dashboard-float float-status">
        <span className="status-check">
          <Check size={15} />
        </span>
        <div>
          <strong>Ideas, beautifully connected.</strong>
          <span>Design + development + intelligence</span>
        </div>
      </div>
    </div>
  );
}
