import { routing } from '@/i18n/routing';
import { Link } from '@/navigation';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

export default function LangSwitchLink({
  locale,
  currentLocale,
  label,
}: {
  locale: string;
  currentLocale: string;
  label: string;
}) {
  const pathname = usePathname();

  const removeLeadingLocales = (path: string): string => {
    const regex = new RegExp(`^\/(${routing.locales.join('|')})\/`);
    return path.replace(regex, '/');
  };

  return (
    <Link
      locale={locale}
      className={clsx([locale === currentLocale ? 'font-bold' : 'text-gray-400	', 'px-2 py-1'])}
      href={removeLeadingLocales(pathname)}
    >
      {label}
    </Link>
  );
}
