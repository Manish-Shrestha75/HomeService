import { Router } from 'express';
import { authenticate, isProvider } from '../middleware/auth.middleware';
import {acceptBookingController,rejectBookingController,viewProviderAllBookingsController,updateBookingStatusController} from '../controller/bookingController';

const router = Router();

router.put( '/:providerId/:bookingId/accept', authenticate, isProvider,  acceptBookingController);

router.put('/:providerId/:bookingId/reject', authenticate, isProvider, rejectBookingController);

router.get('/:providerId/bookings',authenticate, isProvider, viewProviderAllBookingsController);

router.put('/:providerId/:bookingId/status', authenticate, isProvider, updateBookingStatusController);

export default router;