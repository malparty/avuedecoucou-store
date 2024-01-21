import AnimateItems from '@/components/AnimateItems';
import MorePhotos from '@/photo/MorePhotos';
import SiteGrid from '@/components/SiteGrid';
import PhotoLarge from '@/photo/PhotoLarge';
import PhotosEmptyState from '@/photo/PhotosEmptyState';
import { PaginationParams, getPaginationForSearchParams } from '@/site/pagination';
import { pathForRoot } from '@/site/paths';
import { getPhotos } from '@/photo';
import { PHOTOS_COUNT } from '@/photo/data';
import { unstable_setRequestLocale } from 'next-intl/server';

export const runtime = 'edge';

export default async function FullPage({ searchParams, params: { locale } }: PaginationParams) {
  unstable_setRequestLocale(locale);
  const { offset, limit } = getPaginationForSearchParams(searchParams, 12);

  const photos = getPhotos(limit, offset);

  const showMorePhotos = PHOTOS_COUNT > photos.length;

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
      {showMorePhotos && <SiteGrid contentMain={<MorePhotos path={pathForRoot(offset + 1)} />} />}
    </div>
  ) : (
    <PhotosEmptyState />
  );
}
