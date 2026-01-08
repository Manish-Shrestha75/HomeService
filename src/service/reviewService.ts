import { AppDataSource } from '../config/database';
import { Review } from '../entities/review.entity';
import { Booking } from '../entities/booking.entity';

const reviewRepository = AppDataSource.getRepository(Review);
const bookingRepository = AppDataSource.getRepository(Booking);

// CREATE REVIEW
export const createReview = async ( bookingId: string, customerId: string, rating: number,) => {
  
  const booking = await bookingRepository.findOne({
    where: { 
      id: bookingId,
      customer: { id: customerId }
    },
    relations: ['provider']
  });

  if (!booking) {
    return {
      message: "Booking not found"
    };
  }

  // Check if booking is completed
  if (booking.status !== 'completed') {
    return {
      message: "You can only review completed services"
    };
  }

 
  const existingReview = await reviewRepository.findOne({
    where: { booking: { id: bookingId } }
  });

  if (existingReview) {
    return {
      message: "You have already reviewed this service"
    };
  }


  if (rating < 1 || rating > 5) {
    return {
      message: "Rating must be between 1 and 5 stars"
    };
  }

  
  const review = new Review();
  review.rating = rating;
  review.customer = { id: customerId } as any;
  review.provider = { id: booking.provider.id } as any;
  review.booking = { id: bookingId } as any;

  const savedReview = await reviewRepository.save(review);
  
  return {
    message: "Review submitted successfully",
    review: savedReview
  };
};

// GET CUSTOMER REVIEWS
export const getCustomerReviews = async (customerId: string) => {
  return await reviewRepository.find({
    where: { customer: { id: customerId } },
    relations: ['provider', 'booking', 'booking.service'],
    order: { createdAt: 'DESC' }
  });
};

//calculate the average review rate
export const getProviderAverageRating = async (providerId: string) => {
 
  const reviews = await reviewRepository.find({
    where: { provider: { id: providerId } },
    select: ['rating']
  });

  if (reviews.length === 0) {
    return 0;  
  }

  // Calculate average
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  const average = total / reviews.length;
  
  return Number(average.toFixed(1));
};

// provide rating display to customers+
export const getProviderRatingDisplay = async (providerId: string) => {
  const rating = await getProviderAverageRating(providerId);
  
  return {
    providerId,
    averageRating: rating,
    hasRating: rating > 0
  };
};