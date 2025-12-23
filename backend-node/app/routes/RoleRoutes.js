import express from 'express';
import RoleController from '../controllers/RoleController.js';

const router = express.Router();

// CRUD Role
router.post('/', RoleController.createRole);    // Create
router.get('/', RoleController.listRoles);      // Read all
router.get('/:id', RoleController.getRole);     // Read one
router.put('/:id', RoleController.updateRole);  // Update
router.delete('/:id', RoleController.deleteRole); // Delete

export default router;
