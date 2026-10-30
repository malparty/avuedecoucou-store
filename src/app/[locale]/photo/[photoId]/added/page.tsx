import ItemAddedModal from '@/components/ItemAddedModal';
import { redirect } from '@/navigation';
import { PATH_ROOT, pathForPhoto } from '@/site/paths';

export default async function ItemAdded(props: { params: Promise<{ photoId: string, locale: string }> }) {
  const { photoId, locale } = await props.params;

  if (!photoId) {
    return redirect({href: PATH_ROOT, locale });
  }

  const pathClose = pathForPhoto(photoId);

  return <ItemAddedModal pathClose={pathClose} />;
}
