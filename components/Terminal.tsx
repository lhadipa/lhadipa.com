'use client';

import { useEffect, useRef } from 'react';
import { useApp } from '@/lib/i18n';

// terminal digitando `whoami --verbose`
export default function Terminal() {
  const { t, lang } = useApp();
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const lines: { html: string; type?: boolean }[] = [
      { html: '<span class="prompt">➜</span> <span class="cmd">whoami --verbose</span>', type: true },
      { html: '<span class="key">name</span>: <span class="str">"Lucas Padilha"</span>' },
      { html: '<span class="key">role</span>: <span class="str">"AI Engineer · Mobile · Web"</span>' },
      { html: '<span class="key">base</span>: <span class="str">"São Paulo, BR"</span>' },
      {
        html: '<span class="key">stack</span>: [<span class="str">"llm-agents"</span>, <span class="str">"react-native"</span>, <span class="str">"react"</span>, <span class="str">"typescript"</span>]',
      },
      { html: `<span class="key">status</span>: <span class="str">"${t('term-status')}"</span>` },
      { html: `<span class="dim">${t('term-dim')}</span>` },
    ];

    body.innerHTML = '';

    function render(i: number) {
      if (cancelled || !body) return;
      if (i >= lines.length) {
        const p = document.createElement('div');
        p.className = 'term-line';
        p.innerHTML = '<span class="prompt">➜</span> <span class="cursor"></span>';
        body.appendChild(p);
        return;
      }
      const div = document.createElement('div');
      div.className = 'term-line';
      body.appendChild(div);
      if (lines[i].type && !reduced) {
        const plain = 'whoami --verbose';
        let j = 0;
        div.innerHTML = '<span class="prompt">➜</span> <span class="cmd"></span><span class="cursor"></span>';
        const cmd = div.querySelector('.cmd')!;
        const tick = setInterval(() => {
          if (cancelled) {
            clearInterval(tick);
            return;
          }
          cmd.textContent = plain.slice(0, ++j);
          if (j >= plain.length) {
            clearInterval(tick);
            div.querySelector('.cursor')?.remove();
            timers.push(setTimeout(() => render(i + 1), 280));
          }
        }, 55);
      } else {
        div.innerHTML = lines[i].html;
        if (reduced) render(i + 1);
        else timers.push(setTimeout(() => render(i + 1), 170));
      }
    }
    render(0);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return (
    <div className="term-stage">
      <div className="term" aria-hidden="true">
        <div className="term-bar">
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
          <span className="term-title">lucas@padilha — zsh</span>
        </div>
        <div className="term-body" ref={bodyRef} />
      </div>
    </div>
  );
}
