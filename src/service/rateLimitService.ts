import { Repository } from 'typeorm';
import { OTP } from '../entities/otp.entity';

export class RateLimitService {
    constructor(private otpRepository: Repository<OTP>) {}

    // 3 requests per 15 minutes
    async checkRequestLimit(email: string): Promise<{ allowed: boolean; message: string }> {
        const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
        
        const recentRequests = await this.otpRepository.count({
            where: {
                email,
                createdAt: { $gte: fifteenMinutesAgo } as any
            }
        });

        if (recentRequests >= 3) {
            return { 
                allowed: false, 
                message: 'Too many OTP requests. Please wait 15 minutes.' 
            };
        }
        
        return { allowed: true, message: '' };
    }

    // 1 resend per 60 seconds
    async checkResendLimit(email: string): Promise<{ allowed: boolean; message: string }> {
        const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
        
        const recentResends = await this.otpRepository.count({
            where: {
                email,
                createdAt: { $gte: oneMinuteAgo } as any
            }
        });

        if (recentResends >= 1) {
            return { 
                allowed: false, 
                message: 'Please wait 60 seconds before requesting a new OTP.' 
            };
        }
        
        return { allowed: true, message: '' };
    }

    // 5 per day
    async checkDailyLimit(email: string): Promise<{ allowed: boolean; message: string }> {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        
        const dailyCount = await this.otpRepository.count({
            where: {
                email,
                createdAt: { $gte: startOfDay } as any
            }
        });

        if (dailyCount >= 5) {
            return { 
                allowed: false, 
                message: 'Daily OTP limit reached. Try again tomorrow.' 
            };
        }
        
        return { allowed: true, message: '' };
    }
}