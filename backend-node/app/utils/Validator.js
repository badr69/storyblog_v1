export class Validator {

  // Email validation
  static IsValidEmail(email) {
    const pattern = /^[\w.-]+@[\w.-]+\.\w+$/;
    return pattern.test(email);
  }

  // Password strength validation
  static IsStrongPassword(password) {
    // Min 8 chars, 1 majuscule, 1 chiffre, 1 caractère spécial
    const pattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;
    return pattern.test(password);
  }

  // Secure input check (SQL Injection patterns)
  static IsSafeInput(userInput) {
    const pattern = /(--|;|'|"|\/\*|\*\/|xp_)/i;
    return !pattern.test(userInput);  // inverse logique par rapport à ton Python
  }
}
