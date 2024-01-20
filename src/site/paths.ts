import { Photo } from '@/photo';
import { BASE_URL } from './config';

// Core paths
export const PATH_ROOT = '/';
export const PATH_GRID = '/grid';
export const PATH_SETS = '/sets';
export const PATH_OG = '/og';

// Path prefixes
export const PREFIX_PHOTO = '/photo';

// Modifiers
const ADD = 'add';
const SHARE = 'share';
const NEXT = 'next';

// Absolute paths
export const ABSOLUTE_PATH_FOR_HOME_IMAGE = `${BASE_URL}/home-image`;

const pathWithNext = (path: string, next?: number) => (next !== undefined ? `${path}?${NEXT}=${next}` : path);

export const pathForRoot = (next?: number) => pathWithNext(PATH_ROOT, next);

export const pathForGrid = (next?: number) => pathWithNext(PATH_GRID, next);

export const pathForOg = (next?: number) => pathWithNext(PATH_OG, next);

type PhotoOrPhotoId = Photo | string;

const getPhotoId = (photoOrPhotoId: PhotoOrPhotoId) =>
  typeof photoOrPhotoId === 'string' ? photoOrPhotoId : photoOrPhotoId.id;

export const pathForPhoto = (photo: PhotoOrPhotoId) => `${PREFIX_PHOTO}/${getPhotoId(photo)}`;

export const absolutePathForPhotoImage = (photo: Photo) => `${BASE_URL}/${photo.url}`;

export const pathForPhotoShare = (photo: PhotoOrPhotoId) => `${pathForPhoto(photo)}/${SHARE}`;

export const pathForPhotoAddCart = (photo: PhotoOrPhotoId) => `${pathForPhoto(photo)}/${ADD}`;

export const absolutePathForPhoto = (photo: PhotoOrPhotoId) => `${BASE_URL}${pathForPhoto(photo)}`;

// p/[photoId]
export const isPathPhoto = (pathname = '') => new RegExp(`^${PREFIX_PHOTO}/[^/]+/?$`).test(pathname);

// p/[photoId]/share
export const isPathPhotoShare = (pathname = '') => new RegExp(`^${PREFIX_PHOTO}/[^/]+/${SHARE}/?$`).test(pathname);

export const checkPathPrefix = (pathname = '', prefix: string) => pathname.toLowerCase().startsWith(prefix);

export const isPathGrid = (pathname?: string) => checkPathPrefix(pathname, PATH_GRID);

export const isPathSets = (pathname?: string) => checkPathPrefix(pathname, PATH_SETS);

export const getPathComponents = (pathname = ''): { photoId?: string } => {
  return {
    photoId: pathname.match(new RegExp(`^${PREFIX_PHOTO}/([^/]+)`))?.[1],
  };
};

export const getEscapePath = (pathname?: string) => {
  const { photoId } = getPathComponents(pathname);
  if (photoId && isPathPhoto(pathname)) {
    return PATH_GRID;
  } else {
    return pathForPhoto(photoId || '');
  }
};
