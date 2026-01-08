import { z } from 'zod';

export const createCategorySchema = z.object({
    name: z.string()
        .min(2, "Category name must be at least 2 characters")
        .max(100, "Category name cannot exceed 100 characters"),
    
    description: z.string()
        .max(500, "Description cannot exceed 500 characters")
        .optional()
});

export const categoryIdParamSchema = z.object({
    id: z.string()
        .min(1, "Category ID is required")
});

export const updateCategorySchema = z.object({
    name: z.string()
        .min(2, "Category name must be at least 2 characters")
        .max(100, "Category name cannot exceed 100 characters")
        .optional(),
    
    description: z.string()
        .max(500, "Description cannot exceed 500 characters")
        .optional(),
    
    isActive: z.boolean()
        .optional()
});

export const validateRequest = (schema: z.ZodSchema) => {
    return (req: any, res: any, next: any) => {
        const validationResult = schema.safeParse(req.body);
        
        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: validationResult.error.issues
            });
        }
        
        req.validatedData = validationResult.data;
        next();
    };
};

export const validateParams = (schema: z.ZodSchema) => {
    return (req: any, res: any, next: any) => {
        const validationResult = schema.safeParse(req.params);
        
        if (!validationResult.success) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: validationResult.error.issues
            });
        }
        
        req.validatedParams = validationResult.data;
        next();
    };
};