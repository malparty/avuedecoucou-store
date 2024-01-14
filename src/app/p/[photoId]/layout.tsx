import { GRID_THUMBNAILS_TO_SHOW_MAX, Photo, getPhotos } from '@/photo';
import { redirect } from 'next/navigation';
import { PATH_ROOT, absolutePathForPhotoImage } from '@/site/paths';
import PhotoDetailPage from '@/photo/PhotoDetailPage';
import { removeItem } from '@/utility/array';

export const runtime = 'edge';

interface PhotoProps {
  params: { photoId: string };
}

export default async function PhotoPage({ params: { photoId }, children }: PhotoProps & { children: React.ReactNode }) {
  // TODO: restrict to photo NEAR the current photo
  let photos = getPhotos(GRID_THUMBNAILS_TO_SHOW_MAX + 2, 0);

  const photo = photos.find((p) => p.id === photoId) as Photo;
  photos = removeItem(photos, photo)

  if (!photo) {
    redirect(PATH_ROOT);
  }

  const isPhotoFirst = photos.findIndex((p) => p.id === photoId) === 0;

  // Warm OG image without waiting on response
  fetch(absolutePathForPhotoImage(photo));

  return (
    <>
      {children}
      <PhotoDetailPage
        photo={photo}
        photos={photos}
        photosGrid={photos.slice(
          isPhotoFirst ? 1 : 2,
          isPhotoFirst ? GRID_THUMBNAILS_TO_SHOW_MAX + 1 : GRID_THUMBNAILS_TO_SHOW_MAX + 2
        )}
      />
    </>
  );
}
