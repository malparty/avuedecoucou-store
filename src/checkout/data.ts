export const FORMAT_KEYS : formatType[] = ['a', 'b', 'c', 'd', 'e'];
export type formatKeysType = 'a' | 'b' | 'c' | 'd' | 'e';
export type supportType = 'toile' | 'forex' | 'aluminium' | 'acrylique';

type formatsType = {[key in formatKeysType]: string}
type formatType = keyof formatsType;

export const FORMATS: formatsType = { a: '45x30cm', b: '60x40cm', c: '75x50cm', d: '90x60cm', e: '105x70cm' };
export const SUPPORTS: supportType[] = ['toile', 'forex', 'aluminium', 'acrylique'];
export const PRICES: {[key in supportType]: { [key in formatType]: number }} = {
  'toile': { a: 140, b: 150, c: 160, d: 190, e: 270 },
  'forex': { a: 170, b: 180, c: 190, d: 200, e: 280 },
  'aluminium': { a: 210, b: 220, c: 240, d: 280, e: 300 },
  'acrylique': { a: 220, b: 230, c: 260, d: 290, e: 320 },
};
