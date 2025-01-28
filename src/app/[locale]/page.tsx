import { getPhotos } from '@/photo';
import { PHOTOS_COUNT } from '@/photo/data';
import SiteGrid from '@/components/SiteGrid';
import PhotoGrid from '@/photo/PhotoGrid';
import PhotosEmptyState from '@/photo/PhotosEmptyState';
import { PaginationParams, getPaginationForSearchParams } from '@/site/pagination';
import PhotoGridSidebar from '@/photo/PhotoGridSidebar';
import { setRequestLocale } from 'next-intl/server';

export const runtime = 'edge';

export default async function HomePage({ searchParams, params: { locale } }: PaginationParams) {
  setRequestLocale(locale);

  const { offset, limit } = getPaginationForSearchParams(searchParams);

  const photos = getPhotos(limit, offset);

  return photos.length > 0 ? (
    <SiteGrid
      contentMain={<PhotoGrid photos={photos} />}
      contentSide={
        <div className="sticky top-4 space-y-4">
          <PhotoGridSidebar photosCount={PHOTOS_COUNT} />
        </div>
      }
      sideHiddenOnMobile
    />
  ) : (
    <PhotosEmptyState />
  );
}
