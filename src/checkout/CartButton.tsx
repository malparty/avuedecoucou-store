import { FaCartShopping } from 'react-icons/fa6';
import IconPathButton from '@/components/IconPathButton';
import { useTranslations } from 'next-intl';
import Badge from '@/components/Badge';

export default function CartButton({
  path,
  prefetch,
  shouldScroll,
  dim,
}: {
  path: string;
  prefetch?: boolean;
  shouldScroll?: boolean;
  dim?: boolean;
}) {
  const t = useTranslations('cart');
  return (
    <IconPathButton
      {...{
        path,
        title: t('cart_button'),
        icon: (
          <Badge>
            <FaCartShopping
              size={34}
              className={dim ? 'text-dim' : undefined}
            />
          </Badge>
        ),
        prefetch,
        shouldScroll,
        shouldReplace: true,
        spinnerColor: 'dim',
      }}
    />
  );
}
