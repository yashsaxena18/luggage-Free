// authRoutes.js
import express from 'express';
import { register, login, getMe } from '../controllers/authController.js';
import protect from '../middleware/authMiddleware.js'; // ✅ Corrected import

const router = express.Router();

// Routes
router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe); // ✅ Protected route

export default router;
