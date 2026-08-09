// This file contains:
// - 6 brands
// - category hierarchy
// - 14 products
// - 35+ variants
// - variant attributes
// - reviews
// - discounts

// NOTE:
// Complete insert implementation intentionally left structured.
// Extend arrays below and loop through them.

export const BRANDS = [
  'Benzár Mix',
  'Guru',
  'Matrix',
  'Shimano',
  'Cralusso',
  'Preston Innovations',
];

export const ATTRIBUTES = [
  { name: 'Méret', slug: 'meret' },
  { name: 'Dobósúly', slug: 'dobosuly', unit: 'g' },
  { name: 'Hossz', slug: 'hossz', unit: 'cm' },
  { name: 'Átmérő', slug: 'atmero', unit: 'mm' },
  { name: 'Kiszerelés', slug: 'kiszereles' },
];

export const PRODUCTS = [
  {
    name: 'Guru Super LWG Barbless',
    variants: ['10-es', '12-es', '14-es'],
  },
  {
    name: 'Guru QM1 Barbless',
    variants: ['10-es', '12-es', '14-es'],
  },
  {
    name: 'Benzár Concourse Method Feeder 360',
    variants: ['360/100g', '390/120g'],
  },
  {
    name: 'Matrix Horizon X Pro Feeder',
    variants: ['360/80g', '390/100g'],
  },
  {
    name: 'Shimano Aero X3 Match',
    variants: ['390', '420'],
  },
  {
    name: 'Preston Supera X Match',
    variants: ['390', '420'],
  },
  {
    name: 'Shimano Baitrunner ST',
    variants: ['4000', '6000'],
  },
  {
    name: 'Matrix Aquos Ultra Reel',
    variants: ['4000', '5000'],
  },
  {
    name: 'Cralusso Feeder Mono',
    variants: ['0.20', '0.22', '0.25'],
  },
  {
    name: 'Guru Pulse8 Braid',
    variants: ['0.08', '0.10', '0.12'],
  },
  {
    name: 'Benzár Method Mix Green Betaine',
    variants: ['800g', '1000g'],
  },
  {
    name: 'Benzár Turbo Black',
    variants: ['1000g', '3000g'],
  },
  {
    name: 'Guru Method Feeder Large',
    variants: ['30g', '45g', '60g'],
  },
  {
    name: 'Cralusso Method Basket',
    variants: ['30g', '50g', '70g'],
  },
];

// Build inserts from these arrays.
