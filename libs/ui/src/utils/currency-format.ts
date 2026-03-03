/**
 * Utility functions for formatting and parsing currency values
 * with locale-specific thousand separators.
 *
 * Icelandic currency (ISK) doesn't use decimal places, so these
 * functions only handle whole numbers.
 */

/**
 * Get the thousand separator character based on locale
 * @param locale - The locale code ('is' for Icelandic, 'en' for English)
 * @returns The thousand separator character ('.' for Icelandic, ',' for English)
 */
export function getThousandSeparator(locale: string): string {
  return locale === 'is' ? '.' : ','
}

/**
 * Format a number as a currency string with locale-specific thousand separators
 * @param value - The numeric value to format
 * @param locale - The locale code ('is' for Icelandic, 'en' for English)
 * @returns Formatted string with thousand separators (no currency symbol)
 */
export function formatCurrencyValue(value: number | string, locale: string): string {
  // Handle empty or invalid values
  if (value === undefined || value === null || value === '') {
    return ''
  }

  // Convert to number if it's a string
  const numValue = typeof value === 'string' ? parseFloat(value) : value

  // Handle NaN
  if (Number.isNaN(numValue)) {
    return ''
  }

  const thousandSeparator = getThousandSeparator(locale)

  // Round to whole number (ISK doesn't use decimals)
  const rounded = Math.round(numValue)

  // Format with thousand separators
  return Math.abs(rounded)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator)
}

/**
 * Parse a formatted currency string back to a number
 * @param formattedValue - The formatted string with thousand separators
 * @param locale - The locale code ('is' for Icelandic, 'en' for English)
 * @returns The numeric value
 */
export function parseCurrencyValue(formattedValue: string, locale: string): number {
  if (!formattedValue) {
    return 0
  }

  const thousandSeparator = getThousandSeparator(locale)

  // Remove thousand separators and convert to number
  const cleanedValue = formattedValue.replace(new RegExp(`\\${thousandSeparator}`, 'g'), '')
  const numValue = parseFloat(cleanedValue)

  return Number.isNaN(numValue) ? 0 : numValue
}

/**
 * Format a number as a currency string with currency symbol
 * @param value - The numeric value to format
 * @param locale - The locale code ('is' for Icelandic, 'en' for English)
 * @returns Formatted string with thousand separators and currency symbol
 */
export function formatCurrencyWithSymbol(value: number | string, locale: string): string {
  const formatted = formatCurrencyValue(value, locale)
  return formatted ? `${formatted} kr.` : '0 kr.'
}

/**
 * Calculate cursor position after formatting
 * @param previousValue - The previous formatted value
 * @param currentValue - The current formatted value
 * @param previousPosition - The previous cursor position
 * @param locale - The locale code
 * @returns The new cursor position
 */
export function calculateCursorPosition(
  previousValue: string,
  currentValue: string,
  previousPosition: number,
  locale: string
): number {
  const thousandSeparator = getThousandSeparator(locale)

  // Count digits before cursor in previous value
  const previousDigitsBeforeCursor = previousValue
    .substring(0, previousPosition)
    .replace(new RegExp(`\\${thousandSeparator}`, 'g'), '').length

  // Count thousand separators before the same number of digits in current value
  let currentPos = 0
  let digitCount = 0

  while (digitCount < previousDigitsBeforeCursor && currentPos < currentValue.length) {
    const char = currentValue[currentPos]
    if (char && /\d/.test(char)) {
      digitCount++
    }
    currentPos++
  }

  return currentPos
}
