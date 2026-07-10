'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Lang = 'pt' | 'en';

const dict = {
  pt: {
    'cta-talk': 'Fale comigo',
    'feat-ai': 'AI Engineering: LLMs e agentes',
    'feat-mobile': 'Mobile-first com React Native',
    'feat-web': 'Web com React e TypeScript',
    'stat-years': 'anos de código',
    'stat-repos': 'repositórios públicos',
    'stat-since': 'no GitHub desde',
    'about-kicker': 'sobre',
    'about-h2': 'Produto primeiro, código depois',
    'who-h3': 'Quem sou',
    'who-p1': 'Sou Lucas Padilha — engenheiro de software nascido e criado em <strong>São Paulo</strong>, onde vivo hoje. Há mais de uma década transformo ideias em produto no ecossistema JavaScript, a maior parte delas em apps mobile que chegaram de verdade às lojas.',
    'who-p2': 'Hoje trabalho na <strong>Kiddo</strong>, e meu tempo se divide entre construir com <strong>React Native</strong> e explorar o que dá para criar com <strong>LLMs e agentes de IA</strong> — que viraram parte central do meu jeito de trabalhar, não só uma ferramenta de apoio.',
    'who-p3': 'Fora do código, gosto de estrada, café e de ver o sol se pôr longe da cidade. Entendo o problema antes de escrever qualquer linha — e escrevo o mínimo que resolve bem.',
    'now-h3': 'Agora',
    'now-1': 'Construindo produtos com LLMs e agentes de IA',
    'now-2': 'Apps mobile com React Native, do protótipo à loja',
    'now-3': 'Aberto a qualquer desafio que envolva código',
    'work-kicker': 'trabalho',
    'work-h2': 'Projetos que marcaram o caminho',
    'w-thais-desc': 'App de e-commerce integrado ao Shopify, do catálogo ao checkout, com back-end próprio em Node.js/NestJS.',
    'w-elven-desc': 'App de alertas de incidentes. O desafio: garantir que notificações críticas chegassem mesmo com o "Não Perturbe" ativado.',
    'w-medway-desc': 'Doc to Doc — app que conecta médicos, com mobile em React Native/Expo e back-end em Python com Flask.',
    'w-allos-desc': 'Aplicação web de dashboard em Next.js, com BFF em NestJS/Node para consolidar os dados de negócio.',
    'w-claro-desc': 'App em React Native com BFF em Node.js/Express e DynamoDB na AWS — escala de operadora nacional.',
    'w-provi-desc': 'Plataforma web em React + Vite, back-end em Node.js/Express com serviços em Python e PostgreSQL.',
    'w-veloe-desc': 'App em React Native com back-end/BFF em Java e Node.js — e a esteira de CI/CD mobile construída à mão com Fastlane.',
    'w-citus-desc': 'App de feed de notícias construído nos primórdios do React Native — quando quase não havia biblioteca pronta.',
    'contact-h2': 'Vamos construir algo<em>?</em>',
    'contact-p': 'Estou sempre aberto a boas conversas sobre produto, mobile e o futuro do desenvolvimento. O jeito mais rápido de me encontrar:',
    'footer-made': 'feito em São Paulo',
    'term-status': 'aberto a novas ideias',
    'term-dim': '# desde 2015 no GitHub · github.com/lhadipa',
  },
  en: {
    'cta-talk': "Let's talk",
    'feat-ai': 'AI Engineering: LLMs and agents',
    'feat-mobile': 'Mobile-first with React Native',
    'feat-web': 'Web with React and TypeScript',
    'stat-years': 'years of code',
    'stat-repos': 'public repositories',
    'stat-since': 'on GitHub since',
    'about-kicker': 'about',
    'about-h2': 'Product first, code second',
    'who-h3': 'Who I am',
    'who-p1': "I'm Lucas Padilha — a software engineer born and raised in <strong>São Paulo</strong>, where I live today. For over a decade I've been turning ideas into product in the JavaScript ecosystem, most of them mobile apps that actually shipped to the stores.",
    'who-p2': 'I currently work at <strong>Kiddo</strong>, and my time is split between building with <strong>React Native</strong> and exploring what can be created with <strong>LLMs and AI agents</strong> — which became a core part of how I work, not just a helper tool.',
    'who-p3': 'Outside of code, I enjoy road trips, coffee and watching the sun set far from the city. I understand the problem before writing a single line — and write the least code that solves it well.',
    'now-h3': 'Now',
    'now-1': 'Building products with LLMs and AI agents',
    'now-2': 'Mobile apps with React Native, from prototype to store',
    'now-3': 'Open to any challenge that involves code',
    'work-kicker': 'work',
    'work-h2': 'Projects that shaped the journey',
    'w-thais-desc': 'E-commerce app integrated with Shopify, from catalog to checkout, with its own Node.js/NestJS backend.',
    'w-elven-desc': 'Incident-alert app. The challenge: making sure critical notifications got through even with Do Not Disturb enabled.',
    'w-medway-desc': 'Doc to Doc — an app connecting physicians, with React Native/Expo on mobile and a Python/Flask backend.',
    'w-allos-desc': 'Web dashboard application in Next.js, with a NestJS/Node BFF consolidating business data.',
    'w-claro-desc': 'React Native app with a Node.js/Express BFF and DynamoDB on AWS — at national carrier scale.',
    'w-provi-desc': 'Web platform in React + Vite, backend fully in Node.js/Express with Python services and PostgreSQL.',
    'w-veloe-desc': 'React Native app with a Java + Node.js backend/BFF — and the mobile CI/CD pipeline built by hand with Fastlane.',
    'w-citus-desc': 'News-feed app built in the early days of React Native — when almost no ready-made libraries existed.',
    'contact-h2': "Let's build something<em>?</em>",
    'contact-p': "I'm always up for good conversations about product, mobile and the future of software. The fastest way to reach me:",
    'footer-made': 'made in São Paulo',
    'term-status': 'open to new ideas',
    'term-dim': '# on GitHub since 2015 · github.com/lhadipa',
  },
} as const;

export type DictKey = keyof (typeof dict)['pt'];

type Ctx = {
  lang: Lang;
  toggleLang: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  t: (key: DictKey) => string;
};

const AppContext = createContext<Ctx | null>(null);

export function AppProviders({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('pt');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') as Lang | null;
    setLang(savedLang ?? ((navigator.language || 'en').toLowerCase().startsWith('pt') ? 'pt' : 'en'));
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setTheme('dark');
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  }, [lang]);

  useEffect(() => {
    if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
  }, [theme]);

  const toggleLang = () => {
    setLang((l) => {
      const next = l === 'pt' ? 'en' : 'pt';
      localStorage.setItem('lang', next);
      return next;
    });
  };

  const toggleTheme = () => {
    setTheme((t) => {
      const next = t === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      return next;
    });
  };

  const t = (key: DictKey) => dict[lang][key];

  return (
    <AppContext.Provider value={{ lang, toggleLang, theme, toggleTheme, t }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProviders');
  return ctx;
}
