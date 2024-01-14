import { getPhotos } from '@/photo';
import { GRID_OG_DIMENSION, MAX_PHOTOS_TO_SHOW_TEMPLATE } from '@/photo/image-response';
import TemplateImageResponse from '@/photo/image-response/TemplateImageResponse';
import { getIBMPlexMonoMedium } from '@/site/font';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  const [photos, { fontFamily, fonts }] = await Promise.all([
    getPhotos(MAX_PHOTOS_TO_SHOW_TEMPLATE, 0),
    getIBMPlexMonoMedium(),
  ]);

  const { width, height } = GRID_OG_DIMENSION;

  return new ImageResponse(
    (
      <TemplateImageResponse
        {...{
          photos,
          width,
          height,
          fontFamily,
        }}
      />
    ),
    { width, height, fonts }
  );
}
