import { getPhotos } from '@/photo';
import { PHOTOS_COUNT } from '@/photo/data';
import SiteGrid from '@/components/SiteGrid';
import PhotoGrid from '@/photo/PhotoGrid';
import PhotosEmptyState from '@/photo/PhotosEmptyState';
import { pathForGrid } from '@/site/paths';
import { PaginationParams, getPaginationForSearchParams } from '@/site/pagination';
import PhotoGridSidebar from '@/photo/PhotoGridSidebar';

export const runtime = 'edge';

export default async function GridPage({ searchParams }: PaginationParams) {
  const { offset, limit } = getPaginationForSearchParams(searchParams);

  const photos = getPhotos(limit, offset);

  const showMorePath = PHOTOS_COUNT > photos.length ? pathForGrid(offset + 1) : undefined;

  return photos.length > 0 ? (
    <SiteGrid
      contentMain={<PhotoGrid {...{ photos, showMorePath }} />}
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
