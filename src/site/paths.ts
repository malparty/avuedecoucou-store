import { Photo } from '@/photo';
import { BASE_URL } from './config';
import { defaultLocale, locales } from '@/i18n';

// Core paths
export const PATH_ROOT = '/';
export const PATH_FULL = '/full';
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

export const pathForGrid = (next?: number) => pathWithNext(PATH_FULL, next);

export const pathForOg = (next?: number) => pathWithNext(PATH_OG, next);

type PhotoOrPhotoId = Photo | string;

const getPhotoId = (photoOrPhotoId: PhotoOrPhotoId) =>
  typeof photoOrPhotoId === 'string' ? photoOrPhotoId : photoOrPhotoId.id;

export const pathForPhoto = (photo: PhotoOrPhotoId) =>
  `${PREFIX_PHOTO}/${getPhotoId(photo)}`;

export const pathForPhotoWithLocale = (locale = defaultLocale, photo: PhotoOrPhotoId) =>
  `/${locale}${PREFIX_PHOTO}/${getPhotoId(photo)}`;

export const absolutePathForPhotoImage = (photo: Photo) => `${BASE_URL}/${photo.url}`;

export const pathForPhotoShare = (photo: PhotoOrPhotoId) => `${pathForPhoto(photo)}/${SHARE}`;

export const pathForPhotoAddCart = (photo: PhotoOrPhotoId) => `${pathForPhoto(photo)}/${ADD}`;

export const absolutePathForPhoto = (locale: string, photo: PhotoOrPhotoId) =>
  `${BASE_URL}${pathForPhotoWithLocale(locale, photo)}`;

// locale/photo/[photoId]
export const isPathPhoto = (pathname = '') =>
  new RegExp(`^/(${locales.join('|')})${PREFIX_PHOTO}/[^/]+/?$`).test(pathname);

// p/[photoId]/share
export const isPathPhotoShare = (pathname = '') => new RegExp(`^/(${locales.join('|')})${PREFIX_PHOTO}/[^/]+/${SHARE}/?$`).test(pathname);

export const checkPathPrefix = (locale = defaultLocale, pathname = '', prefix: string) =>
  pathname.toLowerCase().startsWith(`/${locale}${prefix}`);

export const isPathGrid = (locale?: string, pathname?: string) => checkPathPrefix(locale, pathname, PATH_FULL);

export const isPathSets = (locale?: string, pathname?: string) => checkPathPrefix(locale, pathname, PATH_SETS);

export const getPathComponents = (pathname = ''): { photoId?: string } => {
  return {
    photoId: pathname.match(new RegExp(`^/(${locales.join('|')})${PREFIX_PHOTO}/([^/]+)`))?.[1],
  };
};

export const getEscapePath = (locale: string, pathname?: string) => {
  const { photoId } = getPathComponents(pathname);
  if (photoId && isPathPhoto(pathname)) {
    return PATH_FULL;
  } else if (photoId) {
    return pathForPhotoWithLocale(locale, photoId);
  } else {
    return PATH_ROOT;
  }
};
