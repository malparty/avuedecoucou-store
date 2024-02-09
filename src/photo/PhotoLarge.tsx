import { Photo, titleForPhoto } from '.';
import SiteGrid from '@/components/SiteGrid';
import ImageLarge from '@/components/ImageLarge';
import { clsx } from 'clsx/lite';
import { pathForPhoto, pathForPhotoShare } from '@/site/paths';
import ShareButton from '@/components/ShareButton';
import SideBarTitle from '@/components/SideBarTitle';
import FormatsPicker from '@/checkout/formats/Picker';

export default function PhotoLarge({
  photo,
  priority,
  prefetchActions,
}: {
  photo: Photo;
  priority?: boolean;
  prefetchActions?: boolean;
}) {
  const renderMiniGrid = (children: JSX.Element, rightPadding = true) => (
    <div
      className={clsx('flex gap-y-4', 'flex-col sm:flex-row md:flex-col', '[&>*]:sm:flex-grow', rightPadding && 'pr-2')}
    >
      {children}
    </div>
  );

  return (
    <SiteGrid
      contentMain={
        <ImageLarge
          className="w-full"
          alt={titleForPhoto(photo)}
          href={pathForPhoto(photo)}
          src={photo.url}
          priority={priority}
        />
      }
      contentSide={
        <div
          className={clsx(
            'leading-snug',
            'sticky top-4 self-start',
            'grid grid-cols-2 md:grid-cols-1',
            'gap-x-0.5 sm:gap-x-1',
            'gap-y-4',
            '-translate-y-1',
            'mb-4'
          )}
        >
          {renderMiniGrid(
            <SideBarTitle href={pathForPhoto(photo)} title={titleForPhoto(photo)} />
          )}
          {renderMiniGrid(
            <>
              <div className={clsx('flex gap-y-4', 'flex-col sm:flex-row md:flex-col')}>
                <ShareButton
                  path={pathForPhotoShare(photo)}
                  prefetch={prefetchActions}
                />
                <FormatsPicker photoTitle={photo.title} />
              </div>
            </>,
            false
          )}
        </div>
      }
    />
  );
}
