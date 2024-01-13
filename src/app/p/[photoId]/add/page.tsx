import { getPhotoCached } from '@/cache';
import AddModal from '@/checkout/AddModal';
import { PATH_ROOT } from '@/site/paths';
import { redirect } from 'next/navigation';

export default async function Share({
  params: { photoId },
}: {
  params: { photoId: string }
}) {
  const photo = await getPhotoCached(photoId);

  if (!photo) { return redirect(PATH_ROOT); }

  return <AddModal photo={photo} />;
}
