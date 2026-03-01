import { describe, it, expect, vi } from 'vitest';
import { validatePassword } from './security';

describe('Security Utilities', () => {
  describe('validatePassword', () => {
    it('should return false for passwords shorter than 8 characters', () => {
      expect(validatePassword('Short1')).toBe(false);
    });

    it('should return false for passwords without numbers', () => {
      expect(validatePassword('NoNumbersHere')).toBe(false);
    });

    it('should return false for passwords without letters', () => {
      expect(validatePassword('12345678')).toBe(false);
    });

    it('should return true for valid passwords', () => {
      expect(validatePassword('ValidPass123')).toBe(true);
    });
  });
});
