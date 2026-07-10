'use client';

import { useApp } from '@/lib/i18n';

export default function Footer() {
  const { t } = useApp();
  return (
    <footer>
      <div className="wrap">
        <span>© 2026 Lucas Padilha</span>
        <span>
          <span>{t('footer-made')}</span> · <span className="ok">exit 0</span>
        </span>
      </div>
    </footer>
  );
}
