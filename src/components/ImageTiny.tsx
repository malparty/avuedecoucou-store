import { ASPECT_RATIO, IMAGE_TINY_WIDTH } from '@/site';
import Image from 'next/image';

export default function ImageTiny({
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
        width: IMAGE_TINY_WIDTH,
        height: Math.round(IMAGE_TINY_WIDTH / ASPECT_RATIO),
      }}
    />
  );
}
