import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { useMotion } from '../hooks/useMotion';

export default function CountUp({ value, decimals = 0, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const m = useMotion();
  const [n, setN] = useState(m.off ? value : 0);

  useEffect(() => {
    if (!inView) return undefined;
    if (m.off) { setN(value); return undefined; }
    let raf;
    const start = performance.now();
    const dur = Math.max(m.duration * 2200, 500);
    const tick = (t) => {
      const p = Math.min((t - start) / dur, 1);
      setN(value * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, m.off, m.duration]);

  return <span ref={ref}>{n.toFixed(decimals)}{suffix}</span>;
}
