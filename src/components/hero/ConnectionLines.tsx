export default function ConnectionLines() {
  return (
    <svg
      className="connection-lines"
      viewBox="0 0 600 600"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M300 300 170 150H90M300 300l140-120h80M300 300 140 420H60M300 300l130 150h100"
        stroke="var(--flow-line)"
        strokeWidth="1"
      />
      <path
        className="data-path"
        d="M90 150h80l130 150 130 150h100M520 180h-80L300 300 140 420H60"
        stroke="var(--flow-particle)"
        strokeWidth="2"
        strokeDasharray="3 90"
      />
      <circle
        cx="300"
        cy="300"
        r="213"
        stroke="var(--flow-line)"
        strokeDasharray="2 12"
      />
    </svg>
  );
}
