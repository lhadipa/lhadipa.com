import type { Metadata, Viewport } from 'next';
import { Albert_Sans, Source_Serif_4, JetBrains_Mono } from 'next/font/google';
import { AppProviders } from '@/lib/i18n';
import './globals.css';

const albert = Albert_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-albert' });
const serif = Source_Serif_4({ subsets: ['latin'], weight: ['600', '700'], variable: '--font-serif' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-jbmono' });

export const metadata: Metadata = {
  metadataBase: new URL('https://lhadipa.com'),
  title: 'Lucas Padilha — AI, Mobile & Web Engineer',
  description:
    'Lucas Padilha, AI Engineer em São Paulo. Produtos com LLMs e agentes, apps mobile com React Native e web com React — de ponta a ponta.',
  authors: [{ name: 'Lucas Padilha' }],
  alternates: { canonical: 'https://lhadipa.com/' },
  icons: {
    icon: [
      { url: '/assets/favicon.svg', type: 'image/svg+xml' },
      { url: '/assets/icon.png', type: 'image/png' },
    ],
    apple: '/assets/icon.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'Lucas Padilha',
    title: 'Lucas Padilha — AI, Mobile & Web Engineer',
    description:
      'Produtos com LLMs e agentes, apps mobile com React Native e web com React — de ponta a ponta, em São Paulo.',
    url: 'https://lhadipa.com/',
    locale: 'pt_BR',
    images: [
      {
        url: 'https://lhadipa.com/assets/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Monograma LP — Lucas Padilha, AI, Mobile & Web Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lucas Padilha — AI, Mobile & Web Engineer',
    description:
      'Produtos com LLMs e agentes, apps mobile com React Native e web com React — de ponta a ponta.',
    images: ['https://lhadipa.com/assets/og.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0e0f13' },
  ],
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Lucas Padilha',
  jobTitle: 'AI Engineer',
  url: 'https://lhadipa.com/',
  image: 'https://lhadipa.com/assets/og.jpg',
  email: 'mailto:padilhamed@gmail.com',
  telephone: '+55-11-95173-4241',
  address: { '@type': 'PostalAddress', addressLocality: 'São Paulo', addressCountry: 'BR' },
  sameAs: ['https://github.com/lhadipa', 'https://www.linkedin.com/in/lucas-padilha-27503596/'],
};

// aplica o tema salvo antes do primeiro paint, evitando flash
const themeInit = `try{if(localStorage.getItem('theme')==='dark')document.documentElement.setAttribute('data-theme','dark')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${albert.variable} ${serif.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
