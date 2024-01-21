import { FaCartShopping } from 'react-icons/fa6';
import IconPathButton from '@/components/IconPathButton';
import { useTranslations } from 'next-intl';

export default function CartButton({
  path,
  prefetch,
  shouldScroll,
}: {
  path: string;
  prefetch?: boolean;
  shouldScroll?: boolean;
}) {
  const t = useTranslations('cart');
  const title = `${t('cart_button')} (2)`;
  return (
    <IconPathButton
      {...{
        path,
        title: title,
        icon: (
          <FaCartShopping
            size={34}
            className={'text-dim'}
          />
        ),
        prefetch,
        shouldScroll,
        shouldReplace: true,
        spinnerColor: 'dim',
      }}
    />
  );
}
