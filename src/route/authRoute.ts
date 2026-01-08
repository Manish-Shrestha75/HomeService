import { Router } from 'express';
import { getAllUsers, getProfile, loginController, logoutController, registerController } from '../controller/authController';
import { authenticate } from '../middleware/auth.middleware';
const router = Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/profile', authenticate, getProfile); 
router.get('/', getAllUsers);
router.post('/logout', logoutController);

export default router;
