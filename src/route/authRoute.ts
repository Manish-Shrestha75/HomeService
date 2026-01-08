import { Router } from 'express';
import { getAllUsers, getProfile, loginController, logoutController, registerController } from '../controller/authController';
import { authenticate } from '../middleware/auth.middleware';
import { registerSchema,loginSchema, validateRequest } from '../utils/ZodValidation/authZod';
const router = Router();

router.post('/register', validateRequest(registerSchema), registerController);
router.post('/login', validateRequest(loginSchema),loginController);
router.get('/profile', authenticate, getProfile); 
router.get('/', getAllUsers);
router.post('/logout', logoutController);

export default router;
