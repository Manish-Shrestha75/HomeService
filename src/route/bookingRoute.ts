import { Router } from 'express';
import { createBookingController, cancelBookingController, getCustomerBookingsController, getEarningsController, getJobHistoryController, rejectBookingController, acceptBookingController, viewProviderAllBookingsController} from '../controller/bookingController';
import { validateRequest } from '../utils/ZodValidation/bookingZod';
import { cancelBookingParamsSchema, createBookingSchema, customerIdParamSchema, validateParams } from '../utils/ZodValidation/bookingZod';

const router = Router();

router.post('/', validateRequest(createBookingSchema), createBookingController);
router.put('/:id/cancel/:customerId', validateParams(cancelBookingParamsSchema), cancelBookingController);
router.get('/customer/:customerId', validateParams(customerIdParamSchema), getCustomerBookingsController);
router.get('/:providerId/earnings', getEarningsController);
router.get('/:providerId/job-history', getJobHistoryController);
router.put('/provider/:providerId/:bookingId/accept', acceptBookingController);
router.put('/provider/:providerId/:bookingId/reject', rejectBookingController);
router.put('/provider/:providerId/:bookingId/reject', viewProviderAllBookingsController);
export default router;