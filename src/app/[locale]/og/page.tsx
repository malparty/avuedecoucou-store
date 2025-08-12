import { getPhotos } from '@/photo';
import { PHOTOS_COUNT } from '@/photo/data';
import StaggeredOgPhotos from '@/photo/StaggeredOgPhotos';
import { PaginationParams, getPaginationForSearchParams } from '@/site/pagination';
import { setRequestLocale } from 'next-intl/server';

export default async function OgPage({ searchParams, params: { locale } }: PaginationParams) {
  setRequestLocale(locale);
  const { offset, limit } = getPaginationForSearchParams(searchParams, PHOTOS_COUNT);

  const photos = getPhotos(limit, offset);

  return (
    <div className="space-y-3">
      <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <StaggeredOgPhotos photos={photos} />
      </div>
    </div>
  );
}
