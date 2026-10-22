export default function DigitalCore() {
  return (
    <div className="core-wrap">
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="orbit orbit-three" />
      <div className="core-halo" />
      <div className="digital-core">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <path d="M19 20h21l42 60H61L19 20Z" fill="currentColor" />
          <path
            d="M64 20 49 41l12 17 28-38H64ZM36 80l15-21-12-17-28 38h25Z"
            fill="currentColor"
          />
        </svg>
      </div>
      <span className="core-caption">THE XENOSAAS ECOSYSTEM</span>
    </div>
  );
}
