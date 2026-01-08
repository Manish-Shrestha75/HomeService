import { Request, Response } from 'express';
import { createReview, getCustomerReviews, getProviderAverageRating, getProviderRatingDisplay} from '../service/reviewService';

// CREATE REVIEW
export const createReviewController = async (req: Request, res: Response) => {
  try {
    const customerId = req.params.customerId; // From URL params
    const { bookingId, rating} = req.body;

    if (!bookingId || !rating) {
      return res.status(400).json({ 
        success: false,
        message: 'Booking ID and rating are required' 
      });
    }

    const result = await createReview(bookingId, customerId, rating);

    if (result.message === "Review submitted successfully") {
      return res.status(201).json({
        success: true,
        message: result.message,
        data: result.review
      });
    } else {
      return res.status(400).json({
        success: false,
        message: result.message
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      success: false,
      message: 'Internal server error' 
    });
  }
};

// GET CUSTOMER REVIEWS
export const getCustomerReviewsController = async (req: Request, res: Response) => {
  try {
    const customerId = req.params.customerId;

    if (!customerId) {
      return res.status(400).json({ 
        success: false,
        message: 'Customer ID is required' 
      });
    }

    const reviews = await getCustomerReviews(customerId);
    
    return res.status(200).json({
      success: true,
      data: reviews
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ 
      success: false,
      message: 'Internal server error' 
    });
  }
};

//calculate average rating
export const getProviderRating = async (req: Request, res: Response) => {
  const { providerId } = req.params;
  const rating = await getProviderAverageRating(providerId);
  
  return res.status(200).json({
    providerId,
    averageRating: rating,
    hasRating: rating > 0
  });
};

// provide review display to customer
export const showProviderRating = async (req: Request, res: Response) => {
  try {
    const { providerId } = req.params;
    const rating = await getProviderRatingDisplay(providerId);
    
    return res.status(200).json(rating);

  } catch (error) {
    return res.status(500).json({ message: "Failed to get provider rating" });
  }
};