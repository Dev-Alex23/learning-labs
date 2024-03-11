import { validateEmail, validatePassword, validateStringLength } from '@utils/Validators';

describe('Validators', () => {
  describe('String length validation', () => {
    it('should accept a string of valid length', () => {
      // Arrange
      const validString = 'Valid';
      const min = 3;
      const max = 10;

      // Act
      const result = validateStringLength(validString, min, max);

      // Assert
      expect(result.isValid).toBe(true);
    });

    it('should reject a string that is too short', () => {
      // Arrange
      const invalidString = 'short';
      const min = 6;
      const max = 10;

      // Act
      const result = validateStringLength(invalidString, min, max);

      // Assert
      expect(result.isValid).toBe(false);
      expect(result.message).toContain(`${invalidString} must be greater than ${min} and less than ${max}`);
    });

    it('should reject a string that is too long', () => {
      // Arrange
      const invalidString = 'this string is too long';
      const min = 6;
      const max = 10;

      // Act
      const result = validateStringLength(invalidString, min, max);

      // Assert
      expect(result.isValid).toBe(false);
      expect(result.message).toContain(`${invalidString} must be greater than ${min} and less than ${max}`);
    });
  });

  describe('Email Validation', () => {
    it('should accept a valid email', () => {
      // Arrange
      const validEmail = 'john@example.com';

      // Act
      const result = validateEmail(validEmail);

      // Assert
      expect(result.isValid).toBe(true);
    });

    it('should reject an invalid email', () => {
      // Arrange
      const invalidEmail = 'john@example';

      // Act
      const result = validateEmail(invalidEmail);

      // Assert
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('Please enter a valid email address');
    });
  });

  describe('Password Validation', () => {
    it('should accept a strong password', () => {
      // Arrange
      const validPassword = 'StrongPassword@123';

      // Act
      const result = validatePassword(validPassword);

      // Assert
      expect(result.isValid).toBe(true);
    });

    it('should require uppercase', () => {
      // Arrange
      const invalidPassword = 'missing-uppercase@123';

      // Act
      const result = validatePassword(invalidPassword);

      // Assert
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('Password must contain at least one uppercase letter.');
    });

    it('should require lowercase', () => {
      // Arrange
      const invalidPassword = 'MISSING-LOWERCASE@123';

      // Act
      const result = validatePassword(invalidPassword);

      // Assert
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('Password must contain at least one lowercase letter.');
    });

    it('should require number', () => {
      // Arrange
      const invalidPassword = 'shouldIncludeNumber@';

      // Act
      const result = validatePassword(invalidPassword);

      // Assert
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('Password must contain at least one number.');
    });

    it('should require number', () => {
      // Arrange
      const invalidPassword = 'noSpecialChar123';

      // Act
      const result = validatePassword(invalidPassword);

      // Assert
      expect(result.isValid).toBe(false);
      expect(result.message).toContain('Password must contain at least one special character.');
    });
  });
});
