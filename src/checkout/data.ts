export const FORMAT_KEYS = ['a', 'b', 'c', 'd', 'e'];
export type formatKeysType = 'a' | 'b' | 'c' | 'd' | 'e';
export type supportType = 'toile' | 'forex' | 'aluminium' | 'acrylique';

type formatsType = {[key in formatKeysType]: string}
type formatType = keyof formatsType;

export const FORMATS: formatsType = { a: '45x30mm', b: '60x40mm', c: '75x50mm', d: '90x60mm', e: '105x70mm' };
export const SUPPORTS: supportType[] = ['toile', 'forex', 'aluminium', 'acrylique'];
export const PRICES: {[key in supportType]: { [key in formatType]: number }} = {
  'toile': { a: 135, b: 140, c: 150, d: 180, e: 240 },
  'forex': { a: 160, b: 165, c: 175, d: 190, e: 260 },
  'aluminium': { a: 200, b: 210, c: 240, d: 270, e: 285 },
  'acrylique': { a: 210, b: 220, c: 250, d: 280, e: 300 },
};
