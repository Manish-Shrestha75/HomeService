import { z } from 'zod';

export const createBookingSchema = z.object({
    serviceId: z.number({
        required_error: "Service ID is required"
    }),
    
    bookingNumber: z.string()
        .min(1, "Booking number is required")
});

export const cancelBookingParamsSchema = z.object({
    id: z.string()
        .min(1, "Booking ID is required"),
    
    customerId: z.string()
        .min(1, "Customer ID is required")
});

export const customerIdParamSchema = z.object({
    customerId: z.string()
        .min(1, "Customer ID is required")
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