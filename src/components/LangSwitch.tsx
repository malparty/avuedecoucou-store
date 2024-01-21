import { locales } from '@/i18n';
import { Link } from '@/navigation';
import { useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';

export default function LangSwitch() {
  const pathname = usePathname();
  const locale = useLocale();

  const removeLeadingLocales = (path: string): string => {
    const regex = new RegExp(`^\/(${locales.join('|')})\/`);
    return path.replace(regex, '/');
  };

  return (
    <div>
      <Link
        locale="fr"
        className={locale === 'fr' ? 'font-bold': 'text-gray-400	'}
        href={removeLeadingLocales(pathname)}
      >
        FR
      </Link>
      |
      <Link
        locale="en"
        className={locale === 'en' ? 'font-bold': 'text-gray-400	'}
        href={removeLeadingLocales(pathname)}
      >
        EN
      </Link>
    </div>
  );
}
