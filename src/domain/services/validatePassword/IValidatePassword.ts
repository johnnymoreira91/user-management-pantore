export interface IValidatePassword {
  validatePasswordStrength(password: string): boolean;
}