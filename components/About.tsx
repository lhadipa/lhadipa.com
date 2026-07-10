'use client';

import { useApp } from '@/lib/i18n';

const STACK_HOT = ['LLMs & Agentes', 'Claude', 'React Native', 'React', 'TypeScript'];
const STACK = ['JavaScript', 'Node.js', 'NestJS', 'Jest', 'Swift', 'SwiftUI', 'Kotlin'];

export default function About() {
  const { t } = useApp();
  return (
    <section id="sobre">
      <div className="sec-head">
        <p className="kicker">{t('about-kicker')}</p>
        <h2>{t('about-h2')}</h2>
      </div>
      <div className="cards">
        <div className="card bio span-6 reveal">
          <h3>{t('who-h3')}</h3>
          <p dangerouslySetInnerHTML={{ __html: t('who-p1') }} />
          <p dangerouslySetInnerHTML={{ __html: t('who-p2') }} />
          <p>{t('who-p3')}</p>
        </div>
        <div className="card span-3 reveal">
          <h3>{t('now-h3')}</h3>
          <ul className="now">
            <li>{t('now-1')}</li>
            <li>{t('now-2')}</li>
            <li>{t('now-3')}</li>
          </ul>
        </div>
        <div className="card span-3 reveal" id="stack">
          <h3>Stack</h3>
          <div className="tags">
            {STACK_HOT.map((s) => (
              <span key={s} className="tag hot">
                {s}
              </span>
            ))}
            {STACK.map((s) => (
              <span key={s} className="tag">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
