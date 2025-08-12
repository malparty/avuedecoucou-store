import AnimateItems from '@/components/AnimateItems';
import PhotoLarge from '@/photo/PhotoLarge';
import PhotosEmptyState from '@/photo/PhotosEmptyState';
import { PaginationParams, getPaginationForSearchParams } from '@/site/pagination';
import { getPhotos } from '@/photo';
import { setRequestLocale } from 'next-intl/server';
import { PHOTOS_COUNT } from '@/photo/data';

export const runtime = 'edge';

export default async function FullPage({ searchParams, params: { locale } }: PaginationParams) {
  setRequestLocale(locale);
  // Currently disabling infinite scrool as we have a limited number of photos
  const { offset, limit } = getPaginationForSearchParams(searchParams, PHOTOS_COUNT);
  const photos = getPhotos(limit, offset);

  return photos.length > 0 ? (
    <div className="space-y-4">
      <AnimateItems
        className="space-y-1"
        duration={0.7}
        staggerDelay={0.15}
        distanceOffset={0}
        staggerOnFirstLoadOnly
        items={photos.map((photo, index) => (
          <PhotoLarge
            key={photo.id}
            photo={photo}
            priority={index <= 1}
          />
        ))}
      />
    </div>
  ) : (
    <PhotosEmptyState />
  );
}
