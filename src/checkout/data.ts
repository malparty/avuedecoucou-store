export const FORMAT_KEYS = ['a', 'b', 'c', 'd', 'e'] as const;
export type formatType = (typeof FORMAT_KEYS)[number];

type formatsType = { [key in formatType]: string };

export const FORMATS: formatsType = { a: '45x30cm', b: '60x40cm', c: '75x50cm', d: '90x60cm', e: '105x70cm' };
export const SUPPORTS = ['toile', 'forex', 'aluminium', 'acrylique', 'paper_shiny', 'paper_mat'] as const;
export type supportType = (typeof SUPPORTS)[number];
export const PRICES: { [key in supportType]: { [key in formatType]: number } } = {
  paper_shiny: { a: 75, b: 85, c: 95, d: 120, e: 130 },
  paper_mat: { a: 75, b: 85, c: 95, d: 120, e: 130 },
  toile: { a: 140, b: 150, c: 160, d: 190, e: 270 },
  forex: { a: 170, b: 180, c: 190, d: 200, e: 280 },
  aluminium: { a: 210, b: 220, c: 240, d: 280, e: 300 },
  acrylique: { a: 220, b: 230, c: 260, d: 290, e: 320 },
};
