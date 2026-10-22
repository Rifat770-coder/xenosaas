import { ImageResponse } from "next/og";
export const alt = "XenoSaas - Ambitious ideas. Extraordinary experiences.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 75,
        background: "#000000",
        color: "#F8FAFC",
      }}
    >
      <div style={{ fontSize: 35, display: "flex", color: "#93C5FD" }}>
        XenoSaas.
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 76,
          letterSpacing: -4,
          lineHeight: 1.1,
        }}
      >
        <span>Ambitious ideas.</span>
        <span style={{ color: "#93C5FD" }}>Extraordinary experiences.</span>
      </div>
      <div style={{ fontSize: 20, color: "#94A3B8" }}>
        Design. Development. Intelligent automation.
      </div>
    </div>,
    size,
  );
}
