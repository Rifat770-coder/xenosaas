import Link from "next/link";
export default function NotFound() {
  return (
    <main className="not-found">
      <span className="eyebrow">404 / A DIFFERENT DIRECTION</span>
      <h1>
        Let&apos;s get you
        <br />
        back on track.
      </h1>
      <Link className="button primary" href="/">
        Return to XenoSaas ↗
      </Link>
    </main>
  );
}
