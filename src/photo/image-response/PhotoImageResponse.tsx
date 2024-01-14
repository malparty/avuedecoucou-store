import { Photo } from '..';
import { AiFillApple } from 'react-icons/ai';
import ImageCaption from './components/ImageCaption';
import ImagePhotoGrid from './components/ImagePhotoGrid';
import ImageContainer from './components/ImageContainer';
import { OG_TEXT_BOTTOM_ALIGNMENT } from '@/site/config';
import { NextImageSize } from '@/services/next-image';

export default function PhotoImageResponse({
  photo,
  width,
  height,
}: {
  photo: Photo;
  width: NextImageSize;
  height: number;
  fontFamily: string;
}) {
  return (
    <ImageContainer {...{ width, height }}>
      <ImagePhotoGrid
        {...{
          photos: [photo],
          width,
          height,
          ...(OG_TEXT_BOTTOM_ALIGNMENT && { imagePosition: 'top' }),
        }}
      />
    </ImageContainer>
  );
}
