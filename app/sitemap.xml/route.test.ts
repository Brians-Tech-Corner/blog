import { describe, it, expect } from 'vitest';
import { toISODateTime } from '@/lib/formatDate';

describe('sitemap.xml route', () => {
  describe('toISODateTime', () => {
    it('should convert YYYY-MM-DD to ISO 8601 format', () => {
      const result = toISODateTime('2025-12-14');
      expect(result).toBe('2025-12-14T00:00:00.000Z');
    });

    it('should return ISO format as-is if already formatted', () => {
      const isoDate = '2025-12-14T10:30:00.000Z';
      const result = toISODateTime(isoDate);
      expect(result).toBe(isoDate);
    });

    it('should handle dates at midnight UTC', () => {
      const result = toISODateTime('2025-01-01');
      expect(result).toBe('2025-01-01T00:00:00.000Z');
    });

    it('should throw error for invalid date format', () => {
      expect(() => toISODateTime('12/14/2025')).toThrow('Invalid date format');
      expect(() => toISODateTime('2025-12-14-extra')).toThrow('Invalid date format');
      expect(() => toISODateTime('not-a-date')).toThrow('Invalid date format');
      expect(() => toISODateTime('')).toThrow('Invalid date format');
    });

    it('should handle month overflow (JavaScript Date behavior)', () => {
      // JavaScript Date auto-corrects invalid dates
      // 2025-02-30 becomes 2025-03-02 (February only has 28 days in 2025)
      const result = toISODateTime('2025-02-30');
      expect(result).toBe('2025-03-02T00:00:00.000Z');
    });

    it('should handle non-leap year February 29', () => {
      // 2025-02-29 becomes 2025-03-01 (2025 is not a leap year)
      const result = toISODateTime('2025-02-29');
      expect(result).toBe('2025-03-01T00:00:00.000Z');
    });

    it('should handle leap years correctly', () => {
      const result = toISODateTime('2024-02-29');
      expect(result).toBe('2024-02-29T00:00:00.000Z');
    });

    it('should handle edge case dates', () => {
      expect(toISODateTime('1970-01-01')).toBe('1970-01-01T00:00:00.000Z');
      expect(toISODateTime('2099-12-31')).toBe('2099-12-31T00:00:00.000Z');
    });
  });
});
