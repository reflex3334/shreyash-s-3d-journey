import { useRef, useState, useEffect } from 'react';

/**
 * Returns [ref, isInViewport] — the element is considered "in viewport"
 * while any part of it is visible, with an optional margin.
 */
export function useInViewport<T extends HTMLElement = HTMLDivElement>(
  margin = '200px'
): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null!);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: margin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [margin]);

  return [ref, visible];
}
