import { Router } from 'express';
import {addServiceController, getProviderController, deleteServiceController, showAllServicesToCustomers} from '../controller/providerController';

const router = Router();

router.post('/:providerId/services', addServiceController);
router.get('/:providerId/services', getProviderController);
router.delete('/:providerId/services/:serviceId', deleteServiceController);
router.get('/services', showAllServicesToCustomers);

export default router;