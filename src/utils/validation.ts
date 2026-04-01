/**
 * Password validation utilities
 */

export interface PasswordRequirements {
  minLength: boolean;
  hasUpper: boolean;
  hasLower: boolean;
  hasNumber: boolean;
}

/**
 * Check password strength requirements
 * @param password - Password to validate
 * @returns Object with boolean properties for each requirement
 */
export const checkPasswordStrength = (password: string): PasswordRequirements => {
  return {
    minLength: password.length >= 8,
    hasUpper: /[A-Z]/.test(password),
    hasLower: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
  };
};

/**
 * Check if password meets all strength requirements
 * @param password - Password to validate
 * @returns True if password is strong, false otherwise
 */
export const isPasswordStrong = (password: string): boolean => {
  const requirements = checkPasswordStrength(password);
  return (
    requirements.minLength &&
    requirements.hasUpper &&
    requirements.hasLower &&
    requirements.hasNumber
  );
};
