import type { CSSProperties } from "react";
import styles from "./AnimatedDataFlow.module.css";

const flows = [
  { path: "M -100 90 C 180 80 170 470 490 640 S 670 720 710 820", duration: 10, delay: -3 },
  { path: "M -100 240 C 140 190 210 490 450 600 S 650 710 700 820", duration: 12, delay: -8 },
  { path: "M -100 390 C 150 290 230 540 460 650 S 620 740 680 820", duration: 9, delay: -5 },
  { path: "M -100 540 C 140 390 260 600 430 670 S 590 750 660 820", duration: 14, delay: -10 },
  { path: "M 1540 70 C 1250 90 1280 460 960 630 S 780 720 730 820", duration: 11, delay: -6 },
  { path: "M 1540 220 C 1280 190 1200 480 980 600 S 800 710 740 820", duration: 13, delay: -2 },
  { path: "M 1540 380 C 1270 290 1200 540 980 650 S 830 740 760 820", duration: 8, delay: -4 },
  { path: "M 1540 550 C 1290 390 1170 600 1010 670 S 850 750 780 820", duration: 14, delay: -7 },
];

/** Decorative data packets follow SVG routes without per-frame React updates. */
export default function AnimatedDataFlow() {
  return (
    <div className={styles.background} aria-hidden="true">
      <div className={styles.aurora} />
      <svg className={styles.svg} viewBox="0 0 1440 820" preserveAspectRatio="none" focusable="false">
        <g className={styles.orbits}>
          <ellipse cx="720" cy="875" rx="650" ry="245" />
          <ellipse cx="720" cy="875" rx="570" ry="213" />
          <path d="M110 795h1220" strokeDasharray="1 12" />
        </g>
        {flows.map(({ path, duration, delay }, index) => (
          <g className={styles.flow} key={path} style={{
            "--flow-duration": `${duration}s`,
            "--flow-delay": `${delay}s`,
          } as CSSProperties}>
            <path className={styles.track} d={path} pathLength={100} />
            <g className={styles.packet} style={{
              offsetPath: `path("${path}")`,
              color: index % 3 === 0 ? "var(--accent-text)" : "var(--flow-particle)",
            }}>
              <rect className={styles.packetShell} x="-24" y="-12" width="48" height="24" rx="6" />
              <path className={styles.packetConnector} d="M-31 0h5m52 0h5" />
              <circle className={styles.packetIndicator} cx="-16" cy="0" r="1.5" />
              <text className={styles.packetText} x="4" y=".5" textAnchor="middle" dominantBaseline="middle">
                {["0101", "{ }", "API", "1010"][index % 4]}
              </text>
              <rect className={styles.packetBit} x="-44" y="-2" width="4" height="4" rx="1" />
              <rect className={styles.packetBit} x="-54" y="-1.5" width="3" height="3" rx=".5" opacity=".4" />
            </g>
          </g>
        ))}
        <g className={styles.nodes}>
          {[[171, 302], [291, 484], [1157, 418], [1280, 265]].map(([x, y], index) => (
            <g key={x} style={{ "--node-delay": `${index * -1.8}s` } as CSSProperties}>
              <circle className={styles.nodeRing} cx={x} cy={y} r="8" />
              <circle className={styles.nodeCore} cx={x} cy={y} r="2" />
              <path className={styles.nodeTick} d={`M${x - 17} ${y}h4m26 0h4M${x} ${y - 17}v4m0 26v4`} />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
