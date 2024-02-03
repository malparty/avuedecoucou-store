import { getPhotos } from '@/photo';
import { IMAGE_OG_DIMENSION, MAX_PHOTOS_TO_SHOW_TEMPLATE_TIGHT } from '@/photo/image-response';
import TemplateImageResponse from '@/photo/image-response/TemplateImageResponse';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  const photos = await getPhotos(MAX_PHOTOS_TO_SHOW_TEMPLATE_TIGHT, 0);

  const { width, height } = IMAGE_OG_DIMENSION;

  return new ImageResponse(
    (
      <TemplateImageResponse
        {...{
          photos,
          includeHeader: false,
          outerMargin: 0,
          width,
          height,
        }}
      />
    ),
    {
      width,
      height,
    }
  );
}
