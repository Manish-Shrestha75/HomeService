import { AppDataSource } from '../config/database';
import { Booking } from '../entities/booking.entity';
import { Service } from '../entities/service.entity';

const bookingRepository = AppDataSource.getRepository(Booking);
const serviceRepository = AppDataSource.getRepository(Service);


export const createBooking = async ( customerId: number, serviceId: number, bookingDate: string,  startTime: string, bookingNumber:string) => {
  
  const service = await serviceRepository.findOne({
    where: { id: serviceId },
    relations: ['provider']
  });

 if (!service) {
    return ({ 
        message:" Service not found"
    });

}
// checking if date is correct because date cannot be before today
  const currentDate = new Date().toISOString().split('T')[0]; 
  if (bookingDate < currentDate) {
    return ({
        message:" Choose correct date."
    });
  }
  
const bookingDateObj = new Date(bookingDate);

// checking if time is valid 
  const hour = parseInt(startTime.split(':')[0]);
  if (hour < 0 || hour >= 24) {
    return({
        message:" Choose correct time."
    });
  }

// checking if home is already booked at this time.
 const existing = await bookingRepository.findOne({
      where: {
        provider: { id: service.provider.id },
        bookingDate: bookingDateObj,
        startTime: startTime,
        status: 'pending'
      }
    });

if (existing) {
  return {
    message: 'Home is already booked at this time'
  };
}


const booking = new Booking();
booking.bookingDate = bookingDateObj;
booking.startTime = startTime;
booking.status = 'pending';
booking.bookingNumber = bookingNumber;


booking.customer = { id: customerId } as any;
booking.provider = { id: service.provider.id } as any;
booking.service = { id: serviceId } as any;


return await bookingRepository.save(booking);
};

//cancel booking 
export const cancelBooking = async (bookingId: string, customerId: string) => {
  
  const booking = await bookingRepository.findOne({
    where: { id: bookingId, customer: { id: customerId }},
    relations: ['service']
  });

  if (!booking) {
    return {
      message: "Booking not found"
    };
  }

  if (booking.status === 'cancelled') {
    return {
      message: "Booking is already cancelled"
    };
  }


  const now = new Date();
  const bookingDate = new Date(booking.bookingDate + 'T' + booking.startTime);

  // Check if service time has passed
  if (now >= bookingDate) {
    return {
      message: "Cannot cancel booking after service start time"
    };
  }

  // Cancel the booking
  booking.status = 'cancelled';
  await bookingRepository.save(booking);

  return {
    message: "Booking cancelled successfully",
    booking: booking
  };
};

// get bookings 
export const viewCustomerBookings = async (customerId: number, status?: string) => {
  const where: any = { customer: { id: customerId } };
  
  if (status) {
    where.status = status;
  }
  
  return await bookingRepository.find({
    where,
    relations: ['service', 'provider', 'service.category'],
    order: { bookingDate: 'DESC' }
  });
};

//accept booking
export const acceptBooking = async (bookingId: string, providerId: string) => {
  
  const booking = await bookingRepository.findOne({
    where: { 
      id: bookingId,
      provider: { id: providerId },
      status: 'pending'
    }
  });

  if (!booking) {
    return {
      message: "Booking not found"
    };
  }

  booking.status = 'accepted';
  await bookingRepository.save(booking);

  return {
    message: "Booking accepted successfully",
    booking: booking
  };
};

//reject booking
export const rejectBooking = async (bookingId: string, providerId: string) => {
  
  const booking = await bookingRepository.findOne({
    where: { 
      id: bookingId,
      provider: { id: providerId },
      status: 'pending'
    }
  });

  if (!booking) {
    return {
      message: "Booking not found or already processed"
    };
  }

  booking.status = 'rejected';
  await bookingRepository.save(booking);

  return {
    message: "Booking rejected",
    booking: booking
  };
};


//  VIEW ALL BOOKINGS 
export const viewProviderAllBookings = async (providerId: string) => {
  
  const bookings = await bookingRepository.find({
    where: { 
      provider: { id: providerId }
    },
    relations: ['customer', 'service'],
    order: { bookingDate: 'DESC' }
  });

  return bookings;
};

/// UPDATE BOOKING STATUS (In Progress, Completed)
export const updateBookingStatus = async (bookingId: string,providerId: string,status: 'in_progress' | 'completed') => {
  const booking = await bookingRepository.findOne({
    where: {
      id: bookingId,
      provider: { id: providerId }
    }
  });

  if (!booking) {
    return { message: 'Booking not found' };
  }

  if (
    (booking.status === 'accepted' && status !== 'in_progress') ||
    (booking.status === 'in_progress' && status !== 'completed')
  ) {
    return {
      message: `Cannot change status from ${booking.status} to ${status}`
    };
  }

  booking.status = status;
  await bookingRepository.save(booking);

  return {
    message: `Booking status updated to ${status}`,
    booking
  };
};

// get provider eraning 

export const getProviderEarnings = async (providerId: string) => {
  // Get completed bookings
  const completedBookings = await bookingRepository.find({
    where: { 
      provider: { id: providerId },
      status: 'completed'
    },
    relations: ['service']
  });

  // Calculate total earnings
  let total = 0;
  completedBookings.forEach(booking => {
    total += booking.service?.price || 0;
  });

  return {
    totalEarnings: total,
    completedJobs: completedBookings.length,
    bookings: completedBookings.map(b => ({
      date: b.bookingDate,
      service: b.service?.name,
      price: b.service?.price,
      status: b.status
    }))
  };
};


// Get provider job history
export const getProviderJobHistory = async (providerId: string) => {
  const bookings = await bookingRepository.find({
    where: { provider: { id: providerId } },
    relations: ['service', 'customer'],
    order: { bookingDate: 'DESC' }
  });

  return {
    jobs: bookings.map(b => ({
      date: b.bookingDate,
      customer: b.customer?.name,
      service: b.service?.name,
      status: b.status,
      price: b.service?.price
    }))
  };
};



