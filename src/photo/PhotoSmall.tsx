import { Photo, titleForPhoto } from '.';
import ImageSmall from '@/components/ImageSmall';
import { Link } from '../navigation';
import { clsx } from 'clsx/lite';
import { pathForPhoto } from '@/site/paths';

export default function PhotoSmall({ photo, selected }: { photo: Photo; selected?: boolean }) {
  return (
    <Link
      href={pathForPhoto(photo)}
      className={clsx('active:brightness-75', selected && 'brightness-50')}
    >
      <ImageSmall
        src={photo.url}
        className="w-full"
        alt={titleForPhoto(photo)}
      />
    </Link>
  );
}
