import { FaCartPlus } from 'react-icons/fa6';
import IconPathButton from '@/components/IconPathButton';

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
  return (
    <IconPathButton
      {...{
        path,
        title: 'Ajouter au panier',
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
