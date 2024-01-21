import { TbPhotoShare } from 'react-icons/tb';
import IconPathButton from '@/components/IconPathButton';
import { useTranslations } from 'next-intl';

export default function ShareButton({
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
  const t = useTranslations('share');

  return (
    <IconPathButton
      {...{
        path,
        title: t('share_button'),
        icon: (
          <TbPhotoShare
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
