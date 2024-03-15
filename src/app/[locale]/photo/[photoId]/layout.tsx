import { useMessages } from 'next-intl';
import { redirect } from 'next/navigation';
import { PATH_ROOT, absolutePathForPhotoImage } from '@/site/paths';
import PhotoDetailPage from '@/photo/PhotoDetailPage';
import { Providers } from '@/providers';
import { unstable_setRequestLocale } from 'next-intl/server';
import { PHOTOS } from '@/photo/data';

export const runtime = 'edge';

interface PhotoProps {
  params: { photoId: string; locale: string };
}

export default function PhotoPage({
  params: { photoId, locale },
  children,
}: PhotoProps & { children: React.ReactNode }) {
  const photoIndex = PHOTOS.findIndex((p) => p.id === photoId);

  if (photoIndex === -1) {
    redirect(PATH_ROOT);
  }

  const photo = PHOTOS[photoIndex];
  // Copy the array of references
  let photos = [...PHOTOS];
  // Remove photo so it is not suggested in the next photos
  photos.splice(photoIndex, 1);

  // Warm OG image without waiting on response
  unstable_setRequestLocale(locale);
  fetch(absolutePathForPhotoImage(photo));

  const messages = useMessages();

  return (
    <Providers
      locale={locale}
      messages={messages}
    >
      {children}
      <PhotoDetailPage
        photo={photo}
        photos={photos}
        photosGrid={photos}
      />
    </Providers>
  );
}
