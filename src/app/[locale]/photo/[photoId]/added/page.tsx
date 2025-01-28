import ItemAddedModal from '@/components/ItemAddedModal';
import { redirect } from '@/navigation';
import { PATH_ROOT, pathForPhoto } from '@/site/paths';

export default function ItemAdded({ params: { photoId, locale } }: { params: { photoId: string, locale: string } }) {
  if (!photoId) {
    return redirect({href: PATH_ROOT, locale });
  }

  const pathClose = pathForPhoto(photoId);

  return <ItemAddedModal pathClose={pathClose} />;
}
