/* eslint-disable max-len */
import '@testing-library/jest-dom';
import { getEscapePath, getPathComponents, isPathPhoto, isPathPhotoShare } from '@/site/paths';

const PHOTO_ID = 'UsKSGcbt';
const SHARE = 'share';

const PATH_ROOT = '/';
const PATH_FULL = '/full';

const PATH_PHOTO = `/p/${PHOTO_ID}`;
const PATH_PHOTO_SHARE = `${PATH_PHOTO}/${SHARE}`;


describe('Paths', () => {
  it('can be classified', () => {
    expect(isPathPhoto(PATH_PHOTO)).toBe(true);
    expect(isPathPhotoShare(PATH_PHOTO_SHARE)).toBe(true);
  });
  it('can be parsed', () => {
    expect(getPathComponents(PATH_ROOT)).toEqual({});
    expect(getPathComponents(PATH_PHOTO)).toEqual({
      photoId: PHOTO_ID,
    });
    expect(getPathComponents(PATH_PHOTO_SHARE)).toEqual({
      photoId: PHOTO_ID,
    });
  });
  it('can be escaped', () => {
    // Root views
    expect(getEscapePath(PATH_ROOT)).toEqual(undefined);
    expect(getEscapePath(PATH_FULL)).toEqual(undefined);
    // Photo views
    expect(getEscapePath(PATH_PHOTO)).toEqual(PATH_FULL);
    expect(getEscapePath(PATH_PHOTO_SHARE)).toEqual(PATH_PHOTO);
  });
});
