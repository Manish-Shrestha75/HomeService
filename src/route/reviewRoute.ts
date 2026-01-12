import { Router } from 'express';
import {  createReviewController, getCustomerReviewsController, getProviderRating, showProviderRating} from '../controller/reviewController';
import { isCustomer } from '../middleware/auth.middleware';
import {  validateRequest, validateParams,  createReviewSchema,  customerIdParamSchema,  providerIdParamSchema} from '../utils/ZodValidation/reviewZod';

const router = Router();

router.post('/customer/:customerId', validateParams(customerIdParamSchema),  validateRequest(createReviewSchema), createReviewController);
router.get('/customer/:customerId', validateParams(customerIdParamSchema), getCustomerReviewsController);
router.get('/providers/:providerId/rating', validateParams(providerIdParamSchema), getProviderRating);
router.get('/providers/:providerId/rating', validateParams(providerIdParamSchema), showProviderRating);

export default router;