import { Router } from 'express';
import {  createReviewController,  getCustomerReviewsController, getProviderRating, showProviderRating,} from '../controller/reviewController';
import { isCustomer } from '../middleware/auth.middleware';

const router = Router();

router.post('/customer/:customerId', isCustomer, createReviewController);

router.get('/customer/:customerId', getCustomerReviewsController);

router.get('/providers/:providerId/rating', getProviderRating);

router.get('/providers/:providerId/rating', showProviderRating);

export default router;