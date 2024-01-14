import { getPhotos } from '@/photo';
import { IMAGE_OG_DIMENSION_SMALL, MAX_PHOTOS_TO_SHOW_OG } from '@/photo/image-response';
import HomeImageResponse from '@/photo/image-response/HomeImageResponse';
import { getIBMPlexMonoMedium } from '@/site/font';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  const { fontFamily, fonts } = await getIBMPlexMonoMedium();

  const photos = getPhotos(MAX_PHOTOS_TO_SHOW_OG, 0);

  const { width, height } = IMAGE_OG_DIMENSION_SMALL;

  return new ImageResponse(<HomeImageResponse {...{ photos, width, height, fontFamily }} />, {
    width,
    height,
    fonts,
  });
}
