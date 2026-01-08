import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoute from './route/authRoute';
import setupSwagger from './config/swagger';
import customerRoutes from './route/customerRoutes';
import reviewRoute from './route/reviewRoute';
import cookieParser from 'cookie-parser';
import categoryRoutes from './route/categoryRoute';
import adminRoutes from './route/adminRoute';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoute);
app.use('/api/customer', customerRoutes);
app.use('/api/review', reviewRoute);
app.use('/api/categories', categoryRoutes);
app.use('/api', adminRoutes);

// health checking 
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

 app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
     setupSwagger(app)
     console.log(` Swagger docs at http://localhost:${PORT}/api-docs`);
});
  
  
    