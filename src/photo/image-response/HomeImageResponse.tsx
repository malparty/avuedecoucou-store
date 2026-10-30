import { Photo } from '..';
import ImageCaption from './components/ImageCaption';
import ImageContainer from './components/ImageContainer';
import ImagePhotoGrid from './components/ImagePhotoGrid';
import { NextImageSize } from '@/services/next-image';

export default function HomeImageResponse({
  photos,
  title,
  width,
  height,
}: {
  photos: Photo[]
  title: string
  width: NextImageSize
  height: number
}) {
  return (
    <ImageContainer {...{ width, height }} >
      <ImagePhotoGrid
        {...{
          photos,
          width,
          height,
        }}
      />
      <ImageCaption {...{ width, height }}>
        {title}
      </ImageCaption>
    </ImageContainer>
  );
}
