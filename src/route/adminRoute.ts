
import { Router } from 'express';
import { approveProviderController, rejectProviderController, showReport, viewAllBookings } from '../controller/adminController';
import { authenticate, isAdmin } from '../middleware/auth.middleware';
import { approveRejectProviderSchema, providerIdParamSchema, validateParams, validateRequest } from '../utils/ZodValidation/adminZOd';

const router = Router();

router.post('/admin/providers/:providerId/approve',  authenticate,  isAdmin, 
    validateParams(providerIdParamSchema),validateRequest(approveRejectProviderSchema),approveProviderController);

router.post('/admin/providers/:providerId/reject', authenticate, isAdmin, 
    validateParams(providerIdParamSchema),
    validateRequest(approveRejectProviderSchema),rejectProviderController);
    
router.get('/admin/bookings', authenticate, isAdmin, viewAllBookings);
router.get('/admin/report', authenticate, isAdmin, showReport);

export default router;