import { AppDataSource } from '../config/database';
import { Service } from '../entities/service.entity';
import { User } from '../entities/user.entity';

const serviceRepository = AppDataSource.getRepository(Service);
const userRepository = AppDataSource.getRepository(User);

//adding the service 
export const AddProviderService = async(providerId: string, name: string, description: string,price: number,category: string) =>{

    const provider = await userRepository.findOne({
        where:{ id: providerId, role: 'provider'}
        
    });

    if(!provider){
        return({
            message:"Provider not found."
        });
    }
    //creating service
    const service = serviceRepository.create({
        name, description, price, category, provider: { id: providerId}
    });
      const savedService = await serviceRepository.save(service);

    return {
        message: "Service added",
        data: savedService
    }
};


//get Service
export const getProviderServices = async (providerId: string) => {
  const services = await serviceRepository.find({
    where: { 
      provider: { id: providerId }
    }
  });

  return {
    message:"Service Fetched",
    services
  };
};


//deleting service 
export const deleteProviderService = async ( serviceId: number, providerId: string) => {
  const service = await serviceRepository.findOne({
    where: {id: serviceId, provider: { id: providerId }},
    relations: ['provider']
  });

  if (!service) {
    return {
      message: "Service not found"
    };
  }

  await serviceRepository.remove(service);

  return {
    message: "Service deleted"
  };
};

//show availability
export const getServicesForCustomers = async () => {
  const services = await serviceRepository.find({
    relations: ['provider']
  });
  
  return {
    services: services.map(s => ({
      name: s.name,
      description: s.description,  
      price: s.price,              
      category: s.category,
      provider: s.provider?.name || "Provider"
    }))
  };
};