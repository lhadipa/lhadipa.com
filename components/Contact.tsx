'use client';

import { useApp } from '@/lib/i18n';

export default function Contact() {
  const { t } = useApp();
  return (
    <section className="contact" id="contato">
      <h2 dangerouslySetInnerHTML={{ __html: t('contact-h2') }} />
      <p>{t('contact-p')}</p>
      <div className="contact-cta">
        <a className="pill primary" href="mailto:padilhamed@gmail.com">
          padilhamed@gmail.com
        </a>
        <a className="pill" href="https://wa.me/5511951734241" target="_blank" rel="noopener noreferrer">
          WhatsApp · +55 11 95173-4241
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
      <div className="socials">
        <a href="https://github.com/lhadipa" target="_blank" rel="noopener noreferrer">
          github
        </a>
        <a href="https://www.linkedin.com/in/lucas-padilha-27503596/" target="_blank" rel="noopener noreferrer">
          linkedin
        </a>
        <a href="https://lhadipa.com" target="_blank" rel="noopener noreferrer">
          lhadipa.com
        </a>
      </div>
    </section>
  );
}
