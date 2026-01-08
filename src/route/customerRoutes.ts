import { Router } from 'express';
import { authenticate, isCustomer } from '../middleware/auth.middleware';
import { getAllCategories} from '../controller/categoryController';
import {  cancelBookingController, createBookingController,  getCustomerBookingsController } from '../controller/bookingController';

const router = Router();

// Protected routes
router.post('/', authenticate, isCustomer, createBookingController);
router.get('/customer/:customerId', isCustomer, authenticate, getCustomerBookingsController);
router.get('/categories',  getAllCategories);
router.put('/:id/cancel/:customerId', isCustomer, cancelBookingController);


export default router;