type MonthNames = 'Styczeń' | 'Luty' | 'Marzec' | 'Kwiecień' | 'Maj' | 'Czerwiec' | 'Lipiec' | 'Sierpień' | 'Wrzesień' | 'Październik' | 'Listopad' | 'Grudzień';

const MONTHS_TYPES: Map<number, MonthNames> = new Map([
  [1, 'Styczeń'],
  [2, 'Luty'],
  [3, 'Marzec'],
  [4, 'Kwiecień'],
  [5, 'Maj'],
  [6, 'Czerwiec'],
  [7, 'Lipiec'],
  [8, 'Sierpień'],
  [9, 'Wrzesień'],
  [10, 'Październik'],
  [11, 'Listopad'],
  [12, 'Grudzień']
]);

export function getMonth(index: number): MonthNames {
  return MONTHS_TYPES.get(index)!;
}
