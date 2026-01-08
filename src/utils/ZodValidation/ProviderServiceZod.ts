import { z } from 'zod';

export const addServiceSchema = z.object({
    name: z.string()
        .min(2, "Service name must be at least 2 characters")
        .max(100, "Service name cannot exceed 100 characters"),
    
    description: z.string()
        .max(500, "Description cannot exceed 500 characters"),
    
    price: z.number()
        .min(0, "Price cannot be negative")
        .max(1000000, "Price is too high"),
    
    category: z.string()
        .min(1, "Category is required")
        .max(100, "Category cannot exceed 100 characters")
});

export const providerIdParamSchema = z.object({
    providerId: z.string()
        .min(1, "Provider ID is required")
});

export const serviceIdParamSchema = z.object({
    serviceId: z.string()
        .min(1, "Service ID is required")
});

export const providerServiceIdSchema = z.object({
    providerId: z.string()
        .min(1, "Provider ID is required"),
    
    serviceId: z.string()
        .min(1, "Service ID is required")
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