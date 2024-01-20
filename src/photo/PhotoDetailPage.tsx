import AnimateItems from '@/components/AnimateItems';
import { Photo } from '.';
import PhotoLarge from './PhotoLarge';
import SiteGrid from '@/components/SiteGrid';
import PhotoGrid from './PhotoGrid';
import { clsx } from 'clsx/lite';
import PhotoLinks from './PhotoLinks';

export default function PhotoDetailPage({
  photo,
  photos,
  photosGrid,
}: {
  photo: Photo;
  photos: Photo[];
  photosGrid?: Photo[];
}) {
  return (
    <div>
      <AnimateItems
        className="md:mb-8"
        animateFromAppState
        items={[
          <PhotoLarge
            key={photo.id}
            photo={photo}
            priority
            prefetchActions
            shouldScrollOnActions={false}
          />,
        ]}
      />
      <SiteGrid
        sideFirstOnMobile
        contentMain={
          <PhotoGrid
            photos={photosGrid ?? photos}
            selectedPhoto={photo}
            animateOnFirstLoadOnly
          />
        }
        contentSide={
          <div className={clsx('grid grid-cols-2', 'gap-0.5 sm:gap-1', 'md:flex md:gap-4', 'user-select-none')}>
            <PhotoLinks
              {...{
                photo,
                photos,
              }}
            />
          </div>
        }
      />
    </div>
  );
}
