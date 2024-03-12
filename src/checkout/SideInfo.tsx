import { Link } from '@/navigation';
import { useTranslations } from 'next-intl';

export default function SideInfo() {
  const t = useTranslations('checkout');

  return (
    <div className="italic mt-6 text-gray-600 dark:text-gray-300">
      <div>{t('add_info.shipping')}</div>
      <div>{t('add_info.tax')}</div>
      <Link className="font-bold"
        target="_blank"
        href="https://avuedecoucou.com/contact/"
        title={t('add_info.contact_me')}>
        {t('add_info.contact')}
      </Link>
    </div>
  );
}
