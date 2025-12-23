// app/controllers/AuthController.js
import AuthService from '../services/AuthService.js';
import UserModel from '../models/UserModel.js';

class AuthController {

  // ======================
  // Register
  // ======================
  static async register(req, res) {
    try {
      const result = await AuthService.register(req.body);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // ======================
  // Login
  // ======================
  static async login(req, res) {
    try {
      const result = await AuthService.login(req.body);
      res.json(result); // renvoie { user, token }
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  }

  // ======================
  // Current user (utilisé par la navbar)
  // ======================
  static async currentUser(req, res) {
    try {
      // req.user doit être défini par le middleware d'auth (JWT)
      if (!req.user || !req.user.userId) {
        return res.status(401).json({ error: 'Token manquant ou invalide' });
      }

      const user = await UserModel.findByPk(req.user.userId, {
        attributes: ['id', 'username', 'email']
      });

      if (!user) {
        return res.status(404).json({ error: 'Utilisateur introuvable' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }
}

export default AuthController;















