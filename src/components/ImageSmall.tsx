import { ASPECT_RATIO, IMAGE_SMALL_WIDTH } from '@/site';
import Image from 'next/image';

export default function ImageSmall({
  className,
  src,
  alt,
}: {
  className?: string;
  src: string;
  alt: string;
}) {
  return (
    <Image
      {...{
        className,
        src,
        alt,
        placeholder: 'empty',
        width: IMAGE_SMALL_WIDTH,
        height: Math.round(IMAGE_SMALL_WIDTH / ASPECT_RATIO),
      }}
    />
  );
}
