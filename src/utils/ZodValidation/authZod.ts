import { z } from 'zod';

// Registration schema
export const registerSchema = z.object({
    name: z.string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name cannot exceed 100 characters"),
    
    email: z.string()
        .email("Valid email address required")
        .max(150, "Email cannot exceed 150 characters"),
    
    password: z.string()
        .min(6, "Password must be at least 6 characters")
        .max(100, "Password cannot exceed 100 characters"),
    
    role: z.enum(['user', 'customer', 'provider','admin'])
        .default('user')
        .optional()
});

// Login schema
export const loginSchema = z.object({
    email: z.string()
        .email("Valid email address required")
        .max(150, "Email cannot exceed 150 characters"),
    
    password: z.string()
        .min(6, "Password must be at least 6 characters")
        .max(100, "Password cannot exceed 100 characters")
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