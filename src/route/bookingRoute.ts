import { Router } from 'express';
import { createBookingController, cancelBookingController, getCustomerBookingsController} from '../controller/bookingController';

const router = Router();

router.post('/', createBookingController);
router.put('/:id/cancel/:customerId', cancelBookingController);
router.get('/customer/:customerId', getCustomerBookingsController);

export default router;