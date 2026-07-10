'use client';

import { useRef } from 'react';
import { useApp, DictKey } from '@/lib/i18n';

type Project = {
  label: string;
  name: string;
  descKey: DictKey;
  tags: string[];
};

// do mais novo para o mais velho
const PROJECTS: Project[] = [
  { label: 'Mobile · E-commerce', name: 'Thais Rodrigues', descKey: 'w-thais-desc', tags: ['React Native', 'Shopify', 'Node.js', 'NestJS'] },
  { label: 'Mobile · Alertas', name: 'Elven Works', descKey: 'w-elven-desc', tags: ['React Native', 'Expo', 'Push Notifications'] },
  { label: 'Mobile · Saúde', name: 'Medway', descKey: 'w-medway-desc', tags: ['React Native', 'Expo', 'Python', 'Flask'] },
  { label: 'Web · Dashboard', name: 'Allos', descKey: 'w-allos-desc', tags: ['Next.js', 'NestJS', 'Node.js'] },
  { label: 'Mobile · Telecom', name: 'Claro', descKey: 'w-claro-desc', tags: ['React Native', 'Express', 'DynamoDB'] },
  { label: 'Web · Fintech', name: 'Provi', descKey: 'w-provi-desc', tags: ['React', 'Vite', 'Python', 'PostgreSQL'] },
  { label: 'Mobile · Mobilidade', name: 'Veloe', descKey: 'w-veloe-desc', tags: ['React Native', 'Java', 'Fastlane'] },
  { label: 'Mobile · Notícias', name: 'Citus Systems', descKey: 'w-citus-desc', tags: ['React Native', 'JavaScript'] },
];

export default function Work() {
  const { t } = useApp();
  const trackRef = useRef<HTMLDivElement>(null);

  const step = () => {
    const track = trackRef.current;
    if (!track) return 358;
    return (track.querySelector<HTMLElement>('.work-card')?.offsetWidth || 340) + 18;
  };

  return (
    <section id="work">
      <div className="sec-head">
        <p className="kicker">{t('work-kicker')}</p>
        <h2>{t('work-h2')}</h2>
      </div>
      <div className="work-track" ref={trackRef}>
        {PROJECTS.map((p) => (
          <article className="work-card reveal" key={p.name}>
            <span className="work-period">{p.label}</span>
            <h3>{p.name}</h3>
            <p>{t(p.descKey)}</p>
            <div className="tags">
              {p.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
      <div className="work-nav">
        <button
          className="work-btn"
          aria-label="Projeto anterior"
          onClick={() => trackRef.current?.scrollBy({ left: -step() })}
        >
          ←
        </button>
        <button
          className="work-btn"
          aria-label="Próximo projeto"
          onClick={() => trackRef.current?.scrollBy({ left: step() })}
        >
          →
        </button>
      </div>
    </section>
  );
}
