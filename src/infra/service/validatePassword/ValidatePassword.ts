import { IValidatePassword } from "@domain/services/validatePassword/IValidatePassword";

export class ValidatePassword implements IValidatePassword {
  validatePasswordStrength(password: string): boolean {
    const minLength = 8;
    const maxLength = 128;
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,128}$/;
    if (password.length < minLength || password.length > maxLength) {
      return false;
    }
    return strongPasswordRegex.test(password);
  }
}