"use client";
import { useSyncExternalStore } from "react";
const query =
  "(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const subscribe = (callback: () => void) => {
  const media = window.matchMedia(query);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
};
// Scroll transforms are disabled on touch devices and reduced-motion displays.
export default function useDesktopMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}
