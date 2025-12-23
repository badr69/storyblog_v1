// app/services/AuthService.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';
import RoleModel from '../models/RoleModel.js';

class AuthService {

  static async register({ username, email, password, roleId }) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      username,
      email,
      password: hashedPassword,
      roleId
    });

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return { user, token };
  }

  static async login({ email, password }) {
    const user = await UserModel.findOne({
      where: { email },
      include: { model: RoleModel, as: 'role' }
    });

    if (!user) {
      throw new Error('Utilisateur introuvable');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Mot de passe incorrect');
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return { user, token };
  }
}

export default AuthService;













