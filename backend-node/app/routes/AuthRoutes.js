import express from 'express';
import AuthController from '../controllers/AuthController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);


// 🔐 protégée par JWT
router.get('/currentUser', authMiddleware, AuthController.currentUser);

export default router;

















