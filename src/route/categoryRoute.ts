import { Router } from 'express';
import { authenticate, isAdmin } from '../middleware/auth.middleware';
import { createCategoryController, updateCategoryController, deleteCategoryController,getAllCategories} from '../controller/categoryController';

const router = Router();

// PUBLIC ROUTES
router.get('/', getAllCategories);
router.post('/', authenticate, isAdmin, createCategoryController);
router.put('/:id', authenticate, isAdmin, updateCategoryController);
router.delete('/:id', authenticate, isAdmin, deleteCategoryController);

export default router;