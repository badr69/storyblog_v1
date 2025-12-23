// app/routes/UserRoutes.js
import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();

router.post('/', UserController.createUser);
router.get('/', UserController.listUsers);
router.get('/:id', UserController.getUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;
