import { Repository } from 'typeorm';
import { OTP } from '../entities/otp.entity';

export const checkRateLimit = async ( otpRepository: Repository<OTP>, email: string, type: 'request' | 'resend' | 'daily'): Promise<{ allowed: boolean; message: string }> => {
    
    if (type === 'request') {
        // 3 per 15 minutes
        const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
        const count = await otpRepository.count({
            where: { email, createdAt: { $gte: fifteenMinutesAgo } as any }
        });
        return count < 3 
            ? { allowed: true, message: '' }
            : { allowed: false, message: 'Too many OTP requests. Please wait 15 minutes.' };
    }

    if (type === 'resend') {
        // 1 per 60 seconds
        const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
        const count = await otpRepository.count({
            where: { email, createdAt: { $gte: oneMinuteAgo } as any }
        });
        return count < 1
            ? { allowed: true, message: '' }
            : { allowed: false, message: 'Please wait 60 seconds before requesting a new OTP.' };
    }

    if (type === 'daily') {
        // 5 per day
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const count = await otpRepository.count({
            where: { email, createdAt: { $gte: startOfDay } as any }
        });
        return count < 5
            ? { allowed: true, message: '' }
            : { allowed: false, message: 'Daily OTP limit reached. Try again tomorrow.' };
    }

    return { allowed: true, message: '' };
};