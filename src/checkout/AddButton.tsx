import { FaCartPlus } from 'react-icons/fa6';
import IconPathButton from '@/components/IconPathButton';
import { useTranslations } from 'next-intl';

export default function AddButton({
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
  const t = useTranslations('checkout');
  return (
    <IconPathButton
      {...{
        path,
        title: t('add_cart'),
        icon: (
          <FaCartPlus
            size={34}
            className={dim ? 'text-dim' : undefined}
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
