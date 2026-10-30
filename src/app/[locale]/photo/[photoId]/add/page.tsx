import { getPhoto } from '@/photo';
import PhotoAddModal from '@/photo/PhotoAddModal';
import { PATH_ROOT } from '@/site/paths';
import { redirect } from 'next/navigation';

export default async function AddPage(props: { params: Promise<{ photoId: string }> }) {
  const { photoId } = await props.params;

  const photo = getPhoto(photoId);

  if (!photo) {
    return redirect(PATH_ROOT);
  }

  return <PhotoAddModal photo={photo} />;
}
