import PhotoOGTile from '@/photo/PhotoOGTile';
import { pathForPhoto } from '@/site/paths';
import { Photo } from '.';
import AddModal from '@/checkout/AddModal';

export default function PhotoAddModal({ photo }: { photo: Photo }) {
  return (
    <AddModal
      photo={photo}
      pathClose={pathForPhoto(photo)}
    >
      <PhotoOGTile photo={photo} />
    </AddModal>
  );
}
