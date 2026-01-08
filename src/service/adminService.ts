import { AppDataSource } from '../config/database';
import { Booking } from '../entities/booking.entity';
import { User } from '../entities/user.entity';

const userRepository = AppDataSource.getRepository(User);
const bookingRepository = AppDataSource.getRepository(Booking);

//accept provider
export const approveProvider = async (providerId: string) => {
  const provider = await userRepository.findOne({ where: { id: providerId } });
  
  if (!provider) {
    return { message: "Provider not found" };
  }
  
  provider.providerStatus = 'approved';
  await userRepository.save(provider);
  
  return { message: "Provider approved" };
};

//reject provider
export const rejectProvider = async (providerId: string) => {
  const provider = await userRepository.findOne({ where: { id: providerId } });
  
  if (!provider) {
    return { message: "Provider not found" };
  }
  
  provider.providerStatus = 'rejected';
  await userRepository.save(provider);
  
  return { message: "Provider rejected" };
};

// Add to booking.service.ts
export const viewAllBookingsForAdmin = async () => {
  const bookings = await bookingRepository.find({
    relations: ['customer', 'provider', 'service'],
    order: { bookingDate: 'DESC' }
  });

  return {
    message: "All bookings fetched",
    count: bookings.length,
    bookings: bookings.map(b => ({
      id: b.id,
      bookingDate: b.bookingDate,
      startTime: b.startTime,
      status: b.status,
      customer: b.customer?.name || "Unknown",
      provider: b.provider?.name || "Unknown",
      service: b.service?.name || "Unknown"
    }))
  };
};

export const getBasicReport = async () => {
  const totalBookings = await bookingRepository.count();
  
  const activeProviders = await userRepository.count({
    where: { role: 'provider', providerStatus: 'approved' }
  });

  return {
    totalBookings,
    activeProviders
  };
};