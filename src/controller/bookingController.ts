// src/controller/bookingController.ts
import { Request, Response } from 'express';
import { acceptBooking, cancelBooking, createBooking, getProviderEarnings, getProviderJobHistory, rejectBooking, updateBookingStatus, viewCustomerBookings, viewProviderAllBookings } from '../service/bookingService';

// create a new booking
export const createBookingController = async (req: Request, res: Response) => {
  try {
    const { customerId, serviceId, bookingDate, startTime, bookingNumber } = req.body;

    if (!customerId || !serviceId || !bookingDate || !startTime) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const result = await createBooking(customerId, serviceId, bookingDate, startTime, bookingNumber);

   
    if ((result as any).message) {
      return res.status(400).json(result);
    }

    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



// cancel booking 
export const cancelBookingController = async (req: Request, res: Response) => {
  try {
    const customerId = req.params.customerId; 
    const bookingId = req.params.id; 

    if (!customerId || !bookingId) {
      return res.status(400).json({ 
        success: false,
        message: 'Booking ID and Customer ID are required' 
      });
    }

    const result = await cancelBooking(bookingId, customerId);

    if (result.message === "Booking cancelled successfully") {
      return res.status(200).json({
        success: true,
        message: result.message,
        data: result.booking
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

// Get booking 
// Get customer bookings
export const getCustomerBookingsController = async (req: Request, res: Response) => {
  try {
    const customerId = req.params.customerId; // keep as string (UUID)
    const status = req.query.status as string;

    if (!customerId) {
      return res.status(400).json({ message: 'Invalid customer ID' });
    }

    const bookings = await viewCustomerBookings(customerId, status);

    return res.status(200).json({
      success: true,
      data: bookings
    });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ 
      success: false,
      message: error.message || 'Internal server error'
    });
  }
};


//accept booking
export const acceptBookingController = async (req: Request, res: Response) => {
  try {
    const providerId = req.params.providerId;
    const bookingId = req.params.bookingId;

    const result = await acceptBooking(bookingId, providerId);

    if (result.message === "Booking accepted successfully") {
      return res.status(200).json({
        success: true,
        message: result.message,
        data: result.booking
      });
    } else {
      return res.status(400).json({
        success: false,
        message: result.message
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
};


//reject booking
export const rejectBookingController = async (req: Request, res: Response) => {
  try {
    const providerId = req.params.providerId;
    const bookingId = req.params.bookingId;

    const result = await rejectBooking(bookingId, providerId);

    if (result.message === "Booking rejected") {
      return res.status(200).json({
        success: true,
        message: result.message,
        data: result.booking
      });
    } else {
      return res.status(400).json({
        success: false,
        message: result.message
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
};

//view booking
export const viewProviderAllBookingsController = async (req: Request, res: Response) => {
  try {
    const providerId = req.params.providerId;

    const bookings = await viewProviderAllBookings(providerId);

    return res.status(200).json({
      success: true,
      data: bookings
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
};


//update booking 
export const updateBookingStatusController = async (req: Request, res: Response) => {
  try {
    const providerId = req.params.providerId;
    const bookingId = req.params.bookingId;
    const { status } = req.body;

    if (!status || !['in_progress', 'completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Status must be "in_progress" or "completed"'
      });
    }

    const result = await updateBookingStatus(bookingId, providerId, status);

    if (result.message.includes('updated')) {
      return res.status(200).json({
        success: true,
        message: result.message,
        data: result.booking
      });
    } else {
      return res.status(400).json({
        success: false,
        message: result.message
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
};

//get all earnings
export const getEarningsController = async (req: Request, res: Response) => {
  try {
    const { providerId } = req.params;
    
    const earnings = await getProviderEarnings(providerId);
    
    res.json({
      success: true,
      data: earnings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching earnings"
    });
  }
};

// Get provider job history controller
export const getJobHistoryController = async (req: Request, res: Response) => {
  try {
    const { providerId } = req.params;
    
    const history = await getProviderJobHistory(providerId);
    
    res.json({
      success: true,
      data: history
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching job history"
    });
  }
};
