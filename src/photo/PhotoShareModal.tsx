import PhotoOGTile from '@/photo/PhotoOGTile';
import { absolutePathForPhoto, pathForPhoto } from '@/site/paths';
import { Photo } from '.';
import ShareModal from '@/components/ShareModal';

export default function PhotoShareModal({ photo }: { photo: Photo }) {
  return (
    <ShareModal
      pathShare={absolutePathForPhoto(photo)}
      pathClose={pathForPhoto(photo)}
    >
      <PhotoOGTile photo={photo} />
    </ShareModal>
  );
}
