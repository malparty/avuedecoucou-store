import PhotoOGTile from '@/photo/PhotoOGTile';
import { absolutePathForPhoto, pathForPhoto } from '@/site/paths';
import { Photo } from '.';
import AddModal from '@/checkout/AddModal';
import { Camera } from '@/camera';
import { FilmSimulation } from '@/simulation';

export default function PhotoAddModal({
  photo,
  tag,
  camera,
  simulation,
}: {
  photo: Photo
  tag?: string
  camera?: Camera
  simulation?: FilmSimulation
}) {
  return (
    <AddModal
      title="Ajouter la photo au panier"
      photo={photo}
      pathClose={pathForPhoto(photo, tag, camera, simulation)}
    >
      <PhotoOGTile photo={photo} />
    </AddModal>
  );
};
