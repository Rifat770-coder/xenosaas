"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";

/** Adapt homepage-only hash links within reused chrome on detail routes.
 * Shared Navbar/Footer and their homepage behavior are left untouched. */
export default function CaseStudyChrome({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    scope.current?.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(link => {
      const hash = link.getAttribute("href");
      if (hash && !document.getElementById(hash.slice(1))) link.setAttribute("href", `/${hash}`);
    });
  }, [pathname]);
  return <div ref={scope} onClickCapture={event => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = (event.target as Element).closest<HTMLAnchorElement>("a");
    const href = link?.getAttribute("href");
    if (href?.startsWith("/#")) { event.preventDefault(); router.push(href); }
  }}>{children}</div>;
}
