// app/controllers/UserController.js
import UserService from '../services/UserService.js';


class UserController {
  static async createUser(req, res) {
    try {
      const { username, email, password, roleId } = req.body;
      const user = await UserService.createUser({ username, email, password, roleId });
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async listUsers(req, res) {
    const users = await UserService.getAllUsers();
    res.json(users);
  }

  static async getUser(req, res) {
    const user = await UserService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  }

  static async updateUser(req, res) {
    try {
      const updatedUser = await UserService.updateUser(req.params.id, req.body);
      if (!updatedUser) return res.status(404).json({ error: 'User not found' });
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  static async deleteUser(req, res) {
    const success = await UserService.deleteUser(req.params.id);
    if (!success) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  }
}

export default UserController;
