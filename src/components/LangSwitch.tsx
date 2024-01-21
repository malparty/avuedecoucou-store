import { locales } from '@/i18n';
import LangSwitchLink from './LangSwitchLink';
import { useLocale } from 'next-intl';

export default function LangSwitch() {
  const currentLocale = useLocale();

  return (
    <div className="divide-x-2">
      {locales.map((locale) => (
        <LangSwitchLink
          key={locale}
          currentLocale={currentLocale}
          locale={locale}
          label={locale.toUpperCase()}
        />
      ))}
    </div>
  );
}
