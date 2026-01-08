import { Request, Response, NextFunction } from 'express';

export const errorHandler = ( err: any, req: Request, res: Response,  next: NextFunction) => {
    
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';
    let errors = err.errors || [];

    // Handle specific error types
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = 'Validation Failed';
        errors = err.errors || [];
    }
    
    if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token';
    }
    
    if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired';
    }
    
   
    // Log error in development
    if (process.env.NODE_ENV === 'development') {
        console.error('Error:', {
            message: err.message,
            stack: err.stack,
            path: req.path,
            method: req.method
        });
    }

    // Send response
    res.status(statusCode).json({
        success: false,
        message,
        errors: errors.length > 0 ? errors : undefined,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};


