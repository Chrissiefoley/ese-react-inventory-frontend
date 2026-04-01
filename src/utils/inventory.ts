/**
 * Utility functions for inventory management
 */

/**
 * Check if inventory count is below the low stock threshold
 * @param count - Current inventory count
 * @param threshold - Low stock threshold (default: 10)
 * @returns True if stock is low, False otherwise
 */
export const isLowStock = (count: number, threshold: number = 10): boolean => {
  return count < threshold;
};

/**
 * Format price with currency symbol
 * @param price - Price to format
 * @returns Formatted price with £ symbol
 */
export const formatPrice = (price: number | string): string => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;
  return `£${numPrice.toFixed(2)}`;
};
