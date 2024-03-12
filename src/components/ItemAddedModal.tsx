import { FaArrowRight, FaCartShopping } from 'react-icons/fa6';
import Modal from '@/components/Modal';
import { TbPhotoCheck } from 'react-icons/tb';
import { clsx } from 'clsx/lite';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';

export default function ItemAddedModal({
  pathClose,
}: {
  pathClose: string;
}) {
  const t = useTranslations('item_added');
  return (
    <Modal onClosePath={pathClose}>
      <div className="space-y-3 md:space-y-4 w-full">
        <div className={clsx('flex items-center gap-x-3', 'text-xl md:text-3xl leading-snug')}>
          <TbPhotoCheck
            size={22}
            className="hidden xs:block"
          />
          <div className="flex-grow">{t('item_added')}</div>
        </div>
        <div>{t('congrats')}</div>
        <Link
          className={clsx(
            'text-medium p-2 text-gray-400 hover:text-gray-600',
            'text-gray-600 dark:text-gray-300',
            'border rounded-md shadow',
            'border-gray-200 hover:border-gray-300',
            'dark:border-gray-700 dark:hover:border-gray-600',
            'flex gap-2',
          )}
          href={pathClose}
        >
          <FaCartShopping size={18} />
          {t('continue_shopping')}
        </Link>
        <Link
          className={clsx(
            'text-medium p-2 text-gray-400 hover:text-gray-600',
            'text-gray-600 dark:text-gray-300',
            'border rounded-md shadow',
            'border-gray-200 hover:border-gray-300',
            'dark:border-gray-700 dark:hover:border-gray-600',
            'flex gap-2',
          )}
          href="/cart"
        >
          <FaArrowRight size={18} />
          {t('checkout_now')}
        </Link>
      </div>
    </Modal>
  );
}
