'use client';

import { useEffect, useRef } from 'react';
import { useApp } from '@/lib/i18n';

const TILT = -0.22; // inclinação da elipse (rad)
const COLORS = ['255,255,255', '170,200,255', '232,178,106'];

type Star = { x: number; y: number; s: number; tw: number; c: string };
type Dust = {
  a: number; rx: number; squash: number; v: number;
  s: number; o: number; wob: number; wv: number; c: string;
};

// hero cósmico: poeira estelar orbitando o nome
export default function Hero() {
  const { t } = useApp();
  const backRef = useRef<HTMLCanvasElement>(null);
  const frontRef = useRef<HTMLCanvasElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const back = backRef.current!;
    const front = frontRef.current!;
    const focus = h1Ref.current!;
    const section = back.parentElement as HTMLElement;
    const bctx = back.getContext('2d')!;
    const fctx = front.getContext('2d')!;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = 0, H = 0, CX = 0, CY = 0;
    let stars: Star[] = [];
    let dust: Dust[] = [];
    let mx = 0, my = 0, tick = 0, raf = 0;

    function size() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = section.clientWidth;
      H = section.clientHeight;
      [back, front].forEach((c) => {
        c.width = W * dpr;
        c.height = H * dpr;
        c.getContext('2d')!.setTransform(dpr, 0, 0, dpr, 0, 0);
      });
      const r = focus.getBoundingClientRect();
      const s = section.getBoundingClientRect();
      CX = r.left - s.left + r.width / 2;
      CY = r.top - s.top + r.height / 2;
      const R = Math.min(r.width * 0.3, 200);
      stars = Array.from({ length: 130 }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        s: Math.random() * 1.4 + 0.3,
        tw: Math.random() * Math.PI * 2,
        c: COLORS[Math.random() < 0.85 ? 0 : 1],
      }));
      dust = Array.from({ length: 620 }, () => {
        const band = Math.random();
        return {
          a: Math.random() * Math.PI * 2,
          rx: R * (1.25 + band * 1.15 + Math.random() * 0.18),
          squash: 0.34 + Math.random() * 0.1,
          v: (0.0016 + Math.random() * 0.0026) * (Math.random() < 0.94 ? 1 : 2.2),
          s: Math.random() * 1.5 + 0.4,
          o: 0.25 + Math.random() * 0.75,
          wob: Math.random() * 14,
          wv: Math.random() * Math.PI * 2,
          c: COLORS[Math.random() < 0.72 ? 0 : Math.random() < 0.7 ? 1 : 2],
        };
      });
    }

    function draw(animate: boolean) {
      tick += 1;
      bctx.clearRect(0, 0, W, H);
      fctx.clearRect(0, 0, W, H);
      const ox = mx * 14, oy = my * 8;
      for (const st of stars) {
        const tw = animate ? 0.4 + 0.6 * Math.abs(Math.sin(st.tw + tick * 0.008)) : 1;
        bctx.fillStyle = `rgba(${st.c},${0.5 * tw})`;
        bctx.fillRect(st.x + ox * 0.3, st.y + oy * 0.3, st.s, st.s);
      }
      const cos = Math.cos(TILT), sin = Math.sin(TILT);
      for (const p of dust) {
        if (animate) p.a += p.v;
        const ex = Math.cos(p.a) * p.rx;
        const ey = Math.sin(p.a) * p.rx * p.squash + (animate ? Math.sin(p.wv + tick * 0.01) * p.wob * 0.3 : 0);
        const x = CX + ex * cos - ey * sin + ox;
        const y = CY + ex * sin + ey * cos + oy;
        const depth = Math.sin(p.a); // >0 = à frente
        const ctx = depth > 0 ? fctx : bctx;
        const fade = 0.45 + 0.55 * (depth * 0.5 + 0.5);
        ctx.fillStyle = `rgba(${p.c},${(p.o * fade).toFixed(3)})`;
        const sz = p.s * (0.7 + 0.5 * (depth * 0.5 + 0.5));
        ctx.fillRect(x, y, sz, sz);
      }
    }

    size();
    window.addEventListener('resize', size);

    const onMove = (e: PointerEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    if (!reduced) {
      window.addEventListener('pointermove', onMove, { passive: true });
      const frame = () => {
        draw(true);
        raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    } else {
      draw(false);
    }

    return () => {
      window.removeEventListener('resize', size);
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="cosmos" id="topo">
      <canvas ref={backRef} id="dust-back" aria-hidden="true" />
      <canvas ref={frontRef} id="dust-front" aria-hidden="true" />
      <div className="cosmos-inner">
        <p className="kicker">AI Engineer</p>
        <h1 ref={h1Ref}>Lucas Padilha</h1>
        <div className="cosmos-cta">
          <a className="pill primary" href="#contato">
            {t('cta-talk')}
          </a>
          <a className="pill" href="https://github.com/lhadipa" target="_blank" rel="noopener noreferrer">
            ★ GitHub
          </a>
          <a
            className="pill"
            href="https://www.linkedin.com/in/lucas-padilha-27503596/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
      <span className="scroll-hint">scroll</span>
    </section>
  );
}
