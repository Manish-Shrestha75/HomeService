import { z } from 'zod';

// Provider approve/reject param schema
export const providerIdParamSchema = z.object({
    providerId: z.string()
        .min(1, "Provider ID is required")
});

// Approve/Reject provider body schema
export const approveRejectProviderSchema = z.object({
    reason: z.string()
        .max(500, "Reason cannot exceed 500 characters")
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