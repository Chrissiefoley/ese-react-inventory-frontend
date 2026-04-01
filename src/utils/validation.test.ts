import { checkPasswordStrength, isPasswordStrong } from './validation';

describe('Password Validation Utils - Unit Tests', () => {
  describe('checkPasswordStrength', () => {
    test('validates password with all requirements met', () => {
      const result = checkPasswordStrength('Test1234');
      expect(result.minLength).toBe(true);
      expect(result.hasUpper).toBe(true);
      expect(result.hasLower).toBe(true);
      expect(result.hasNumber).toBe(true);
    });

    test('detects password too short', () => {
      const result = checkPasswordStrength('Test1');
      expect(result.minLength).toBe(false);
    });

    test('detects missing uppercase letter', () => {
      const result = checkPasswordStrength('test1234');
      expect(result.hasUpper).toBe(false);
    });

    test('detects missing lowercase letter', () => {
      const result = checkPasswordStrength('TEST1234');
      expect(result.hasLower).toBe(false);
    });

    test('detects missing number', () => {
      const result = checkPasswordStrength('TestTest');
      expect(result.hasNumber).toBe(false);
    });
  });

  describe('isPasswordStrong', () => {
    test('returns true for strong password', () => {
      expect(isPasswordStrong('StrongPass123')).toBe(true);
      expect(isPasswordStrong('Test1234')).toBe(true);
      expect(isPasswordStrong('MyPassword1')).toBe(true);
    });

    test('returns false for weak passwords', () => {
      expect(isPasswordStrong('weak')).toBe(false); // Too short, no upper, no number
      expect(isPasswordStrong('alllowercase1')).toBe(false); // No uppercase
      expect(isPasswordStrong('ALLUPPERCASE1')).toBe(false); // No lowercase
      expect(isPasswordStrong('NoNumbers')).toBe(false); // No number
      expect(isPasswordStrong('Short1')).toBe(false); // Too short
    });
  });
});
