import { Photo, titleForPhoto } from '.';
import ImageTiny from '@/components/ImageTiny';
import Link from 'next/link';
import { clsx } from 'clsx/lite';
import { pathForPhoto } from '@/site/paths';

export default function PhotoTiny({
  photo,
  selected,
  className,
}: {
  photo: Photo
  selected?: boolean
  className?: string
}) {
  return (
    <Link
      href={pathForPhoto(photo)}
      className={clsx(
        className,
        'active:brightness-75',
        selected && 'brightness-50',
        'min-w-[50px]',
      )}
    >
      <ImageTiny
        src={photo.url}
        alt={titleForPhoto(photo)}
      />
    </Link>
  );
};
