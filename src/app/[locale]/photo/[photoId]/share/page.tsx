import { getPhoto } from '@/photo';
import PhotoShareModal from '@/photo/PhotoShareModal';
import { PATH_ROOT } from '@/site/paths';
import { redirect } from 'next/navigation';

export default async function Share(props: { params: Promise<{ photoId: string }> }) {
  const { photoId } = await props.params;

  const photo = getPhoto(photoId);

  if (!photo) {
    return redirect(PATH_ROOT);
  }

  return <PhotoShareModal photo={photo} />;
}
