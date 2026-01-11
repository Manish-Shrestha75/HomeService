import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { Booking } from '../entities/booking.entity';
import { Review } from '../entities/review.entity';
import { Service } from '../entities/service.entity';
import dotenv from 'dotenv';
import { Category } from '../entities/category.entity';
import { OTP } from '../entities/otp.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD  || 'admin',
  database: process.env.DB_NAME || 'homeService',
  synchronize: true,
  logging: true,
  entities: [User, Booking, Review, Service, Category, OTP],
   ssl: {
        rejectUnauthorized: false}
  
});

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => {
    console.log('Database connection failed:', error);
  });
