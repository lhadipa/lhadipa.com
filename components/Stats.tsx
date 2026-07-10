'use client';

import { useApp } from '@/lib/i18n';

export default function Stats() {
  const { t } = useApp();
  return (
    <div className="stats-row">
      <div className="stat reveal">
        <b>
          10<em>+</em>
        </b>
        <span>{t('stat-years')}</span>
      </div>
      <div className="stat reveal">
        <b>19</b>
        <span>{t('stat-repos')}</span>
      </div>
      <div className="stat reveal">
        <b>2015</b>
        <span>{t('stat-since')}</span>
      </div>
    </div>
  );
}
