import { isLowStock, formatPrice } from './inventory';

describe('Inventory Utils - Unit Tests', () => {
  describe('isLowStock', () => {
    test('returns true when stock is below threshold', () => {
      expect(isLowStock(5)).toBe(true);
      expect(isLowStock(0)).toBe(true);
      expect(isLowStock(9)).toBe(true);
    });

    test('returns false when stock is at threshold', () => {
      expect(isLowStock(10)).toBe(false);
    });

    test('returns false when stock is above threshold', () => {
      expect(isLowStock(11)).toBe(false);
      expect(isLowStock(50)).toBe(false);
      expect(isLowStock(100)).toBe(false);
    });

    test('works with custom threshold', () => {
      expect(isLowStock(4, 5)).toBe(true);
      expect(isLowStock(5, 5)).toBe(false);
      expect(isLowStock(6, 5)).toBe(false);
    });
  });

  describe('formatPrice', () => {
    test('formats number with two decimal places', () => {
      expect(formatPrice(9.99)).toBe('£9.99');
      expect(formatPrice(10)).toBe('£10.00');
      expect(formatPrice(0)).toBe('£0.00');
    });

    test('formats string number with two decimal places', () => {
      expect(formatPrice('9.99')).toBe('£9.99');
      expect(formatPrice('10')).toBe('£10.00');
      expect(formatPrice('0')).toBe('£0.00');
    });

    test('rounds to two decimal places', () => {
      expect(formatPrice(9.999)).toBe('£10.00');
      expect(formatPrice(9.994)).toBe('£9.99');
      expect(formatPrice(10.5)).toBe('£10.50');
    });
  });
});
