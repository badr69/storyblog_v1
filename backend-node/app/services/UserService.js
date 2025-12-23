// app/services/UserService.js
import UserModel from '../models/UserModel.js';
import { Validator } from '../utils/Validator.js';
import { Security } from '../utils/Security.js';

class UserService {

  // 🔹 Création d'utilisateur avec validations, hash et protection contre injection SQL
  static async createUser({ username, email, password, roleId }) {
    // Vérification injection SQL
    if (Security.DetectSqlInjection(username) || Security.DetectSqlInjection(email)) {
      throw new Error('Entrée invalide détectée (possible injection SQL)');
    }

    // Validation
    if (!Validator.IsValidEmail(email)) throw new Error('Email invalide');
    if (!Validator.IsStrongPassword(password)) throw new Error('Mot de passe trop faible');
    if (!Validator.IsSafeInput(username)) throw new Error('Nom utilisateur non sécurisé');

    // Nettoyage HTML
    username = Security.SanitizeHtml(username);
    email = Security.SanitizeHtml(email);

    // Hash du mot de passe
    const hashedPassword = await Security.HashPassword(password);

    // Création utilisateur
    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      roleId
    });

    // Retour sans mot de passe
    const { password: _, ...userData } = user.toJSON();
    return userData;
  }

  // 🔹 Récupérer un utilisateur par ID
  static async getUserById(id) {
    const user = await UserModel.findByPk(id, { include: 'role' });
    if (!user) return null;
    const { password: _, ...userData } = user.toJSON();
    return userData;
  }

  // 🔹 Récupérer tous les utilisateurs
  static async getAllUsers() {
    const users = await UserModel.findAll({ include: 'role' });
    return users.map(u => {
      const { password: _, ...userData } = u.toJSON();
      return userData;
    });
  }

  // 🔹 Mettre à jour un utilisateur
  static async updateUser(id, newData) {
    const user = await UserModel.findByPk(id);
    if (!user) return null;

    // Vérification injection SQL
    if ((newData.username && Security.DetectSqlInjection(newData.username)) ||
        (newData.email && Security.DetectSqlInjection(newData.email))) {
      throw new Error('Entrée invalide détectée (possible injection SQL)');
    }

    if (newData.username) {
      if (!Validator.IsSafeInput(newData.username)) throw new Error('Nom utilisateur non sécurisé');
      newData.username = Security.SanitizeHtml(newData.username);
    }

    if (newData.email) {
      if (!Validator.IsValidEmail(newData.email)) throw new Error('Email invalide');
      newData.email = Security.SanitizeHtml(newData.email);
    }

    if (newData.password) {
      if (!Validator.IsStrongPassword(newData.password)) throw new Error('Mot de passe trop faible');
      newData.password = await Security.HashPassword(newData.password);
    }

    user.set(newData);
    await user.save();

    const { password: _, ...userData } = user.toJSON();
    return userData;
  }

  // 🔹 Supprimer un utilisateur
  static async deleteUser(id) {
    const user = await UserModel.findByPk(id);
    if (!user) return null;
    await user.destroy();
    return true;
  }

  // 🔹 Vérifier mot de passe
  static async verifyUserPassword(user, password) {
    return await Security.VerifyPassword(password, user.password);
  }
}

export default UserService;
