interface ValidationResult {
  isValid: boolean;
  message?: string;
}

/**
 * Validates the length of a string.
 *
 * @param {number} min - The minimum length of the string.
 * @param {number} max - The maximum length of the string.
 * @param {string} value - The string to validate.
 * @returns {ValidationResult} The result of the validation, including a boolean validity flag and an optional message.
 */
export const validateStringLength = (value: string, min: number, max: number): ValidationResult => {
  if (value.length < min || value.length > max) {
    return { isValid: false, message: `${value} must be greater than ${min} and less than ${max}` };
  }

  return { isValid: true };
};

/**
 * Validates whether a string is a valid email address.
 *
 * @param {string} value - The email address to validate.
 * @returns {ValidationResult} The result of the validation, including a boolean validity flag and an optional message.
 */
export const validateEmail = (value: string): ValidationResult => {
  const emailRegex = /^\S+@\S+\.\S+$/;

  if (!emailRegex.test(value)) {
    return { isValid: false, message: `Please enter a valid email address` };
  }

  return { isValid: true };
};

/**
 * Validates a password against specified criteria.
 *
 * @param {string} value - The password to validate.
 * @param {boolean} [requireUppercase=true] - Whether an uppercase letter is required.
 * @param {boolean} [requireLowercase=true] - Whether a lowercase letter is required.
 * @param {boolean} [requireNumber=true] - Whether a number is required.
 * @param {boolean} [requireSpecialChar=true] - Whether a special character is required.
 * @returns {ValidationResult} The result of the validation, including a boolean validity flag and an optional message.
 */
export const validatePassword = (
  value: string,
  requireLowercase: boolean = true,
  requireUppercase: boolean = true,
  requireNumber: boolean = true,
  requireSpecialChar: boolean = true
): ValidationResult => {
  if (requireUppercase && !/[A-Z]/.test(value)) {
    return { isValid: false, message: 'Password must contain at least one uppercase letter.' };
  }

  if (requireLowercase && !/[a-z]/.test(value)) {
    return { isValid: false, message: 'Password must contain at least one lowercase letter.' };
  }

  if (requireNumber && !/[0-9]/.test(value)) {
    return { isValid: false, message: 'Password must contain at least one number.' };
  }

  if (requireSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
    return { isValid: false, message: 'Password must contain at least one special character.' };
  }

  return { isValid: true };
};
