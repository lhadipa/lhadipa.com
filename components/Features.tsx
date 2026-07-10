'use client';

import { useApp } from '@/lib/i18n';

export default function Features() {
  const { t } = useApp();
  return (
    <div className="features">
      <span className="feature">
        <span className="ic">✦</span> <span>{t('feat-ai')}</span>
      </span>
      <span className="feature">
        <span className="ic">📱</span> <span>{t('feat-mobile')}</span>
      </span>
      <span className="feature">
        <span className="ic">⌨</span> <span>{t('feat-web')}</span>
      </span>
    </div>
  );
}
