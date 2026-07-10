'use client';

import { useEffect, useRef } from 'react';

// sol que segue o mouse — visível apenas no tema claro (via CSS)
export default function Sun() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sun = ref.current;
    if (!sun) return;
    let tx = window.innerWidth * 0.82;
    let ty = window.innerHeight * 0.28;
    let x = tx;
    let y = ty;
    sun.style.transform = `translate(${x}px, ${y}px)`;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    let raf = 0;
    const follow = () => {
      x += (tx - x) * 0.045;
      y += (ty - y) * 0.045;
      sun.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      raf = requestAnimationFrame(follow);
    };
    raf = requestAnimationFrame(follow);

    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="sun" ref={ref} aria-hidden="true">
      <div className="glow" />
      <div className="rays" />
      <div className="disc" />
    </div>
  );
}
