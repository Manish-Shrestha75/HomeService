import { z } from 'zod';

export const createReviewSchema = z.object({
    rating: z.number()
        .min(1, "Rating must be at least 1 star")
        .max(5, "Rating cannot exceed 5 stars"),
    
    comment: z.string()
        .max(500, "Comment cannot exceed 500 characters")
        .optional()
});

export const reviewParamsSchema = z.object({
    bookingId: z.string()
        .min(1, "Booking ID is required")
});

export const customerIdParamSchema = z.object({
    customerId: z.string()
        .min(1, "Customer ID is required")
});

export const providerIdParamSchema = z.object({
    providerId: z.string()
        .min(1, "Provider ID is required")
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