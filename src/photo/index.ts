import { PHOTOS } from './data';

export interface Photo {
  id: string;
  title: string;
  url: string;
}

export const getPhotos = (limit: number, offset: number): Photo[] => {
  return PHOTOS.slice(offset, offset + limit);
};

export const getPhoto = (id: string): Photo | undefined => {
  return PHOTOS.find(p => p.id == id);
};

export const getPreviousPhoto = (photo: Photo) => {
  const index = PHOTOS.findIndex((p) => p.id === photo.id);
  return index > 0 ? PHOTOS[index - 1] : undefined;
};

export const getNextPhoto = (photo: Photo) => {
  const index = PHOTOS.findIndex((p) => p.id === photo.id);
  return index < PHOTOS.length - 1 ? PHOTOS[index + 1] : undefined;
};

export const titleForPhoto = (photo: Photo) => photo.title || photo.id;

export const photoLabelForCount = (count: number) => (count === 1 ? 'Photo' : 'Photos');

export const photoQuantityText = (count: number, includeParentheses = true) =>
  includeParentheses ? `(${count} ${photoLabelForCount(count)})` : `${count} ${photoLabelForCount(count)}`;
