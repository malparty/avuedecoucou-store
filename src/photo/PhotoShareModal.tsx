import PhotoOGTile from '@/photo/PhotoOGTile';
import { absolutePathForPhoto, pathForPhoto } from '@/site/paths';
import { Photo } from '.';
import ShareModal from '@/components/ShareModal';
import { useLocale } from 'next-intl';

export default function PhotoShareModal({ photo }: { photo: Photo }) {
  const locale = useLocale();
  return (
    <ShareModal
      pathShare={absolutePathForPhoto(locale, photo)}
      pathClose={pathForPhoto(photo)}
    >
      <PhotoOGTile photo={photo} />
    </ShareModal>
  );
}
