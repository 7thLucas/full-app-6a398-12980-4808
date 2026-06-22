import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref + boolean that flips to true once the element scrolls into
 * view. Once seen, it stays true (one-shot) so animations don't replay.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  rootMargin = "0px"
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin, threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, rootMargin]);

  return { ref, inView };
}

/**
 * Simple "after mount" flag — flips true a frame after mount. Useful for
 * triggering load-once animations even without scroll (e.g. analytics tab
 * which mounts when its route activates).
 */
export function useMounted(delayMs = 80) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), delayMs);
    return () => clearTimeout(t);
  }, [delayMs]);
  return mounted;
}
