import { getPhoto } from '@/photo';
import PhotoShareModal from '@/photo/PhotoShareModal';
import { PATH_ROOT } from '@/site/paths';
import { redirect } from 'next/navigation';

export default function Share({ params: { photoId } }: { params: { photoId: string } }) {
  const photo = getPhoto(photoId);

  if (!photo) {
    return redirect(PATH_ROOT);
  }

  return <PhotoShareModal photo={photo} />;
}
