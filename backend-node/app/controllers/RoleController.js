import RoleService from '../services/RoleService.js';

class RoleController {
  // CREATE
  static async createRole(req, res) {
    try {
      const { name } = req.body;
      const role = await RoleService.createRole(name);
      res.status(201).json(role);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // READ all
  static async listRoles(req, res) {
    const roles = await RoleService.getAllRoles();
    res.json(roles);
  }

  // READ one
  static async getRole(req, res) {
    const role = await RoleService.getRoleById(req.params.id);
    if (!role) return res.status(404).json({ error: 'Role not found' });
    res.json(role);
  }

  // UPDATE
  static async updateRole(req, res) {
    try {
      const updatedRole = await RoleService.updateRole(req.params.id, req.body);
      if (!updatedRole) return res.status(404).json({ error: 'Role not found' });
      res.json(updatedRole);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  // DELETE
  static async deleteRole(req, res) {
    const success = await RoleService.deleteRole(req.params.id);
    if (!success) return res.status(404).json({ error: 'Role not found' });
    res.json({ message: 'Role deleted' });
  }
}

export default RoleController;
