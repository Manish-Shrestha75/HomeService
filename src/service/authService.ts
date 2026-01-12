import {User} from '../entities/user.entity';
import { AppDataSource } from "../config/database";
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OTP } from '../entities/otp.entity';
import{ sendOTPEmail} from '../utils/nodemailer';
import { MoreThanOrEqual } from 'typeorm';

const userRepository = AppDataSource.getRepository(User);
const otpRepository = AppDataSource.getRepository(OTP);
const JWT_SECRET = process.env.JWT_SECRET || 'my_secret_key';

// RATE LIMITING FUNCTIONS
const checkRequestRateLimit = async (email: string) => {
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
    const count = await otpRepository.count({
        where: { email, createdAt: MoreThanOrEqual(fifteenMinutesAgo) }
    });
    return count < 3;
};

const checkResendRateLimit = async (email: string) => {
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
    const count = await otpRepository.count({
        where: { email, createdAt: MoreThanOrEqual(oneMinuteAgo) }
    });
    return count < 1;
};

const checkDailyLimit = async (email: string) => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const count = await otpRepository.count({
        where: { email, createdAt: MoreThanOrEqual(startOfDay)}
    });
    return count < 5;
};

//register service

export const registerService = async( name: string, email:string, password: string, confirmPassword: string, role: string)=>{
    const existingUser = await userRepository.findOne({ where: {email}});

    if (password !== confirmPassword) {
    return{
        error: "Password didnt match."
    }
  }

    if(existingUser)
    {
        return null;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = userRepository.create({ name,email, password: hashedPassword, role});

    await userRepository.save(user);


    return{
        id: user.id,
        name: user.name,
        role: user.role
    }

}

 export const loginService = async (email:string, password: string)=>{

    const user = await userRepository.findOne({where: {email}});

    if(!user){
        return null;

    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword)
    {
        return null;
    }

    const token = jwt.sign(
        {id: user.id,
        role: user.role },
        JWT_SECRET,
        {expiresIn: '7d'})

    return {
        sucess: true,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        token

    };
};

export const getUserProfileService = async(userId: string) => {
    const user = await userRepository.findOne({ where :{ id : userId}});

    if (!user){
        return null;

    }
    return{
        id:user.id,
        name:user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
    }
};

export const getAllUsersService = async () => {
    const users = await userRepository.find({
        select: ['id', 'name', 'email', 'role', 'createdAt'] 
    });
    
    return users;
};

const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};


export const requestOTPService = async(email: string) => {
   
    const user = await userRepository.findOne({ where: { email } });
    if (!user) return { success: false, message: 'User not found' };

    if (!(await checkRequestRateLimit(email))) {
        return { success: false, message: 'Too many OTP requests. Please wait 15 minutes.' };
    }
    

    // Create OTP
    const otp = generateOTP();
    
 
    const otpData = otpRepository.create({email, otp, expiresAt: new Date(Date.now() + 5 * 60 * 1000) }); // Changed to 5 minutes
    await otpRepository.save(otpData);
    
    console.log(` OTP for ${email}: ${otp}`); 

     const emailSent = await sendOTPEmail(email, otp);
    
    if (!emailSent) {
        console.log(' Email sending failed, but OTP was saved');
    }

    return { 
        success: true, 
        message: emailSent ? 'OTP sent to email' : 'OTP generated but email failed',
        otp: otp,  
        expiresAt: otpData.expiresAt
    };
};

// Verify OTP 
export const verifyOTPService = async(email: string, otp: string) => {
    const otpData = await otpRepository.findOne({ where: { email, otp } });
    
    if (!otpData) {
        return { success: false, message: 'Invalid OTP' };
    }

    if (new Date() > otpData.expiresAt) {
        return { success: false, message: 'OTP expired' };
        
    }
    
    await otpRepository.delete(otpData.id);

    // Get user
    const user = await userRepository.findOne({ where: { email } });
    if (!user) {
    return { success: false, message: 'User not found' };
}
    
    // Generate token 
    const token = jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        JWT_SECRET,
        { expiresIn: '7d' }
    );

    return {
        success: true,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        token
    };
};

// Resend OTP
export const resendOTPService = async(email: string) => {
    const user = await userRepository.findOne({ where: { email } });
    if (!user) return { success: false, message: 'User not found' };

   
    if (!(await checkDailyLimit(email))) {
        return { success: false, message: 'Daily OTP limit reached. Try again tomorrow.' };
    }
    
    if (!(await checkResendRateLimit(email))) {
        return { success: false, message: 'Please wait 60 seconds before requesting a new OTP.' };
    }
    
    if (!(await checkRequestRateLimit(email))) {
        return { success: false, message: 'Too many OTP requests. Please wait 15 minutes.' };
    }


    // Delete old OTPs
    await otpRepository.delete({ email, verified: false });

    // Create new OTP
    const otp = generateOTP();
    const otpData = otpRepository.create({
        email, 
        otp, 
        expiresAt: new Date(Date.now() + 5 * 60 * 1000) 
    });
    await otpRepository.save(otpData);
    
    console.log(`Resent OTP for ${email}: ${otp}`);

    const emailSent = await sendOTPEmail(email, otp);
    
    if (!emailSent) {
        console.log('Email sending failed, but OTP was saved');
    }

    return { 
        success: true, 
        message: emailSent ? 'OTP resent to email' : 'OTP regenerated but email failed',
        otp: otp,  
        expiresAt: otpData.expiresAt
    };
};