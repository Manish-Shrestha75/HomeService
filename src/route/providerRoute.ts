import { Router } from 'express';
import {  addServiceController, getProviderController,  deleteServiceController,  showAllServicesToCustomers} from '../controller/providerController';
import {  validateRequest, validateParams,  addServiceSchema,  providerIdParamSchema,  providerServiceIdSchema} from '../utils/ZodValidation/ProviderServiceZod';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.post( '/services', authenticate, validateRequest(addServiceSchema), addServiceController);

router.get('/:providerId/services', validateParams(providerIdParamSchema), getProviderController);
router.delete('/:providerId/services/:serviceId', validateParams(providerServiceIdSchema), deleteServiceController);
router.get('/services', showAllServicesToCustomers);

export default router;
