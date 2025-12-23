import RoleModel from '../models/RoleModel.js';

class RoleService {
  // CREATE
  static async createRole(name) {
    try {
      const role = await RoleModel.create({ name });
      return role;
    } catch (err) {
      throw new Error('Erreur création rôle: ' + err.message);
    }
  }

  // READ all
  static async getAllRoles() {
    return await RoleModel.findAll();
  }

  // READ one
  static async getRoleById(id) {
    return await RoleModel.findByPk(id);
  }

  // UPDATE
  static async updateRole(id, data) {
    const role = await RoleModel.findByPk(id);
    if (!role) return null;
    role.set(data);
    await role.save();
    return role;
  }

  // DELETE
  static async deleteRole(id) {
    const role = await RoleModel.findByPk(id);
    if (!role) return null;
    await role.destroy();
    return true;
  }
}

export default RoleService;
