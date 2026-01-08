import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET || 'my_secret_key';



export const authenticate = (req: Request, res: Response, next: NextFunction)=>{
   
   try{
    
      let token: string | null = null;

    const authHeader = req.header('Authorization');

    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.replace('Bearer ', '');
    }
    
    
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      });
    }

        const decoded = jwt.verify(token, JWT_SECRET) as {id:string, role:string};
        (req as any).user = decoded; 
        next();

    }
    catch(error){
        return res.status(401).json({
            success: false,
            message:"Invalid token"
        });

    }
};

//checking role

export const isAdmin = (req: Request, res: Response, next: NextFunction)=>{
    const user = (req as any).user;

    if(!user || user.role  !== 'admin'){
            return res.status(401).json({
            success: false,
            message:"Only admin can access"
        });

    }
    next();
};


export const isCustomer = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  
  if (!user || user.role !== 'customer') {
    return res.status(403).json({ 
      success: false, 
      message: 'Customer access only' 
    });
  }
  next();
};


export const isProvider = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  
  if (!user || user.role !== 'provider') {
    return res.status(403).json({ 
      success: false, 
      message: 'Provider access only' 
    });
  }
  next();
};