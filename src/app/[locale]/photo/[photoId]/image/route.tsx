import { getPhoto } from '@/photo';
import { IMAGE_OG_DIMENSION } from '@/photo/image-response';
import PhotoImageResponse from '@/photo/image-response/PhotoImageResponse';
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(_: Request, context: { params: { photoId: string } }) {
  const photo = await getPhoto(context.params.photoId);

  if (!photo) {
    return new Response('Photo not found', { status: 404 });
  }

  const { width, height } = IMAGE_OG_DIMENSION;

  return new ImageResponse(<PhotoImageResponse {...{ photo, width, height }} />, { width, height});
}
