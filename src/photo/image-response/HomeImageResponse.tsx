import { Photo } from '..';
import ImageCaption from './components/ImageCaption';
import ImageContainer from './components/ImageContainer';
import ImagePhotoGrid from './components/ImagePhotoGrid';
import { NextImageSize } from '@/services/next-image';
import { useTranslations } from 'next-intl';

export default function HomeImageResponse({
  photos,
  width,
  height,
}: {
  photos: Photo[]
  width: NextImageSize
  height: number
}) {
  const t = useTranslations('layout');

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
        {t('header_title')}
      </ImageCaption>
    </ImageContainer>
  );
}
