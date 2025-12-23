




import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import sanitizeHtml from 'sanitize-html';

export class Security {

  // Hash du mot de passe avec bcrypt
  static async HashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  // Vérifie le mot de passe
  static async VerifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  // Génère un token hexadécimal sécurisé
  static GenerateToken(length = 32) {
    return crypto.randomBytes(length).toString('hex');
  }

  // Nettoie le HTML pour éviter les XSS
  static SanitizeHtml(inputStr) {
    const allowedTags = ['b', 'i', 'u', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li'];
    const allowedAttrs = {
      a: ['href', 'title', 'target', 'rel']
    };
    return sanitizeHtml(inputStr, {
      allowedTags,
      allowedAttributes: allowedAttrs,
      strip: true
    });
  }

  // Détecte des motifs simples d’injection SQL
  static DetectSqlInjection(inputStr) {
    const pattern = /(--|;|'|"|\/\*|\*\/|\b(SELECT|UPDATE|DELETE|INSERT|DROP|ALTER|CREATE|EXEC|UNION|XP_)\b)/i;
    return pattern.test(inputStr);
  }
}
