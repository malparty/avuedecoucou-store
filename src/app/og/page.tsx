import { getPhotos } from '@/photo';
import MorePhotos from '@/photo/MorePhotos';
import StaggeredOgPhotos from '@/photo/StaggeredOgPhotos';
import { PHOTOS_COUNT } from '@/photo/data';
import { PaginationParams, getPaginationForSearchParams } from '@/site/pagination';
import { pathForOg } from '@/site/paths';

export default async function GridPage({ searchParams }: PaginationParams) {
  const { offset, limit } = getPaginationForSearchParams(searchParams);

  const photos = getPhotos(limit, offset);

  const showMorePhotos = PHOTOS_COUNT > photos.length;

  return (
    <div className="space-y-3">
      <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <StaggeredOgPhotos photos={photos} />
      </div>
      {showMorePhotos && <MorePhotos path={pathForOg(offset + 1)} />}
    </div>
  );
}
