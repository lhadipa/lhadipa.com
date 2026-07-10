'use client';

import { useApp } from '@/lib/i18n';

export default function Navbar() {
  const { t, lang, toggleLang, theme, toggleTheme } = useApp();

  return (
    <div className="navbar wrap">
      <nav className="bar" aria-label="principal">
        <a className="logo" href="#">
          <b>lucas</b>@padilha:~$
        </a>
        <div className="nav-links">
          <a href="#sobre">About</a>
          <a href="#work">Work</a>
          <a href="#contato">Contact</a>
        </div>
        <div className="nav-right">
          <button className="theme-toggle" onClick={toggleLang} aria-label="Trocar idioma / switch language">
            {lang === 'pt' ? '🇧🇷' : '🇺🇸'}
          </button>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Alternar tema claro/escuro">
            {theme === 'light' ? '☀' : '🌙'}
          </button>
          <a className="pill primary" style={{ padding: '10px 22px' }} href="#contato">
            {t('cta-talk')}
          </a>
        </div>
      </nav>
    </div>
  );
}
