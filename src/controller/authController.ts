import { Request, Response } from "express";
import { getAllUsersService, getUserProfileService, loginService, registerService, requestOTPService, resendOTPService, verifyOTPService } from "../service/authService";

export const registerController = async(req:Request, res:Response)=>{
    try{
        const { name , email, password, confirmPassword, role} = req.body;

        if(!name || !email ||!password ){
            return res.status(400).json({
                success: false,
                message: " Name, email, password are required."
            });
        }

        const user = await registerService(name, email, password, confirmPassword, role);
        if(!user){
            return res.status(400).json({
                success: false,
                message: " User already exists"

            });
            }
        
    
        return res.status(201).json({
            success: false,
            message: 'User registered sucessfully',
            data: user
        });

    }
    catch(error: any){
        return res.status(400).json({
            success: false,
            message:  error.message
        });

    }
}

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email or Password Missing."
      });
    }

    const result = await loginService(email, password);

    if (!result) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

   
    res.cookie('token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 
    });

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: result.user
    });

  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


export const getProfile = async(req: Request, res: Response)=>{
    try{
        const userId = await getUserProfileService(req.params.id);

        if(!userId ){
              return res.status(400).json({
            success: false,
            message: "UserId is required."
        });

        }
        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: userId


        });
    }

    catch(error:any){
        return res.status(401).json({
            success: false,
            error: error.message
        });

    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const user = await getAllUsersService();
        
        res.json({
            success: true,
            message: 'Users retrieved successfully',
            data: user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching users'
        });
    }
};

//logout
export const logoutController = (req: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production'
  });

  return res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
};


//request otp
export const requestOTP = async (req: Request, res: Response) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const result = await requestOTPService(email);
    
    if (!result.success) {
        return res.status(400).json(result);
    }
    

    res.status(200).json(result);
};

//verify otp
export const verifyOTP = async (req: Request, res: Response) => {
    const { email, otp } = req.body;
    
    if (!email || !otp) {
        return res.status(400).json({ error: 'Email and OTP are required' });
    }

    const result = await verifyOTPService(email, otp);
    
    if (!result.success) {
        return res.status(400).json(result);
    }

    res.status(200).json(result);
};

// resend otp
export const resendOTP = async (req: Request, res: Response) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const result = await resendOTPService(email);
    
    if (!result.success) {
        return res.status(400).json(result);
    }

    res.status(200).json(result);
};
