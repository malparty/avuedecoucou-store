export const FORMAT_KEYS = ['a', 'b', 'c', 'd', 'e'] as const;
export type formatType = (typeof FORMAT_KEYS)[number];

type formatsType = { [key in formatType]: string };

export const FORMATS: formatsType = { a: '45x30cm', b: '60x40cm', c: '75x50cm', d: '90x60cm', e: '105x70cm' };
export const SUPPORTS = ['paper_shiny', 'paper_mat', 'toile', 'forex', 'aluminium', 'acrylique'] as const;
export type supportType = (typeof SUPPORTS)[number];
export const PRICES: { [key in supportType]: { [key in formatType]: number } } = {
  paper_shiny: { a: 80, b: 90, c: 100, d: 125, e: 135 },
  paper_mat: { a: 80, b: 90, c: 100, d: 125, e: 135 },
  toile: { a: 150, b: 160, c: 170, d: 200, e: 280 },
  forex: { a: 180, b: 190, c: 200, d: 210, e: 290 },
  aluminium: { a: 230, b: 240, c: 260, d: 300, e: 320 },
  acrylique: { a: 250, b: 260, c: 290, d: 320, e: 350 },
};
