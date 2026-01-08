
import { Router } from 'express';
import { approveProviderController, rejectProviderController, showReport, viewAllBookings } from '../controller/adminController';
import { authenticate, isAdmin } from '../middleware/auth.middleware';

const router = Router();

router.post('/admin/providers/:providerId/approve', authenticate, isAdmin, approveProviderController);
router.post('/admin/providers/:providerId/reject', authenticate, isAdmin, rejectProviderController);
router.get('/admin/bookings', authenticate, isAdmin, viewAllBookings);
router.get('/admin/report', authenticate, isAdmin, showReport);

export default router;