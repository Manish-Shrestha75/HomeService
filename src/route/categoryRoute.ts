import { Router } from 'express';
import { authenticate, isAdmin } from '../middleware/auth.middleware';
import { createCategoryController, updateCategoryController, deleteCategoryController,getAllCategories} from '../controller/categoryController';
import { validateRequest } from '../utils/ZodValidation/categoryService';
import { categoryIdParamSchema, createCategorySchema, updateCategorySchema } from '../utils/ZodValidation/categoryService';
import { validateParams } from '../utils/ZodValidation/categoryService';

const router = Router();

// PUBLIC ROUTES

router.get('/', getAllCategories);
router.post('/', authenticate, isAdmin, validateRequest(createCategorySchema), createCategoryController);
router.put('/:id', authenticate, isAdmin, validateParams(categoryIdParamSchema), validateRequest(updateCategorySchema), updateCategoryController);
router.delete('/:id', authenticate, isAdmin, validateParams(categoryIdParamSchema), deleteCategoryController);
export default router;