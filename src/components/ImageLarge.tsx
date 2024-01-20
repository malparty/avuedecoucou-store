import { IMAGE_LARGE_WIDTH, ASPECT_RATIO } from '@/site';
import Image from 'next/image';
import { Link } from '../navigation';

export default function ImageLarge({
  className,
  href,
  src,
  alt,
  priority,
}: {
  className?: string
  href: string
  src: string
  alt: string
  priority?: boolean
}) {
  return (
    <Link
      href={href}
      className="active:brightness-75"
    >
      <Image {...{
        className,
        src,
        alt,
        priority,
        placeholder: 'empty',
        width: IMAGE_LARGE_WIDTH,
        height: Math.round(IMAGE_LARGE_WIDTH / ASPECT_RATIO),
      }} />
    </Link>
  );
};
