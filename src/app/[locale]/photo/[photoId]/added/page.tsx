import ItemAddedModal from '@/components/ItemAddedModal';
import { redirect } from '@/navigation';
import { PATH_ROOT, pathForPhoto } from '@/site/paths';

export default function ItemAdded({ params: { photoId } }: { params: { photoId: string } }) {
  if (!photoId) {
    return redirect(PATH_ROOT);
  }

  const pathClose = pathForPhoto(photoId);

  return <ItemAddedModal pathClose={pathClose} />;
}
