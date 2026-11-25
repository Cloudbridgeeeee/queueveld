import { useEffect, useRef, useState } from 'react';

export const reduced = () => typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** Adds `.in` to every `.reveal` element as it enters the viewport, including ones mounted later. */
export function useReveal(key: string) {
  useEffect(() => {
    const show = (el: Element) => el.classList.add('in');
    if (reduced() || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach(show);
      return;
    }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { show(e.target); io.unobserve(e.target); } }), { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
    const scan = () => document.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el));
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });
    const sweep = () => document.querySelectorAll('.reveal:not(.in)').forEach((el) => { if (el.getBoundingClientRect().top < innerHeight) show(el); });
    addEventListener('scroll', sweep, { passive: true });
    const t = setTimeout(sweep, 400);
    return () => { io.disconnect(); mo.disconnect(); removeEventListener('scroll', sweep); clearTimeout(t); };
  }, [key]);
}

/** Counts up to `to` once the element is visible. */
export function useCountUp<T extends HTMLElement>(to: number, ms = 1400) {
  const ref = useRef<T>(null);
  const [v, setV] = useState(reduced() ? to : 0);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced()) { setV(to); return; }
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      const s = performance.now();
      const tick = (n: number) => { const p = Math.min(1, (n - s) / ms); setV(to * (1 - Math.pow(1 - p, 3))); if (p < 1) raf = requestAnimationFrame(tick); };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, ms]);
  return [ref, v] as const;
}

export function useCycle<T>(items: readonly T[], ms = 2600) {
  const [i, setI] = useState(0);
  useEffect(() => { if (reduced()) return; const t = setInterval(() => setI((n) => (n + 1) % items.length), ms); return () => clearInterval(t); }, [items.length, ms]);
  return items[i]!;
}

export function useMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title === 'Home' ? 'QueueVeld — Make every service appointment count' : `${title} — QueueVeld`;
    if (description) document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  }, [title, description]);
}
