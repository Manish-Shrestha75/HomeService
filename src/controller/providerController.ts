import { Request, Response } from 'express';
import {AddProviderService, getProviderServices, deleteProviderService, getServicesForCustomers} from '../service/providerService';
import { acceptBooking } from '../service/bookingService';

// Add service
export const addServiceController = async (req: Request, res: Response) => {
  try {
    const providerId = req.params.providerId;
    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields required"
      });
    }

    const result = await AddProviderService(
      providerId, name, description, price, category
    );

    return res.status(201).json({
      success: true,
      message: "Service added Sucessfully.",
      data: result
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// get service 
export const getProviderController = async (req: Request, res: Response)=>{
    try{
        const providerId = req.params.providerId;

    const result = await getProviderServices(providerId);
     return res.status(200).json({
      success: true,
      data: result.services

    });
}
    catch(error: any) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
}
};




// Delete service
export const deleteServiceController = async (req: Request, res: Response) => {
  try {
    const providerId = req.params.providerId;
    const serviceId = parseInt(req.params.serviceId);

    if (isNaN(serviceId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid service ID"
      });
    }

    const result = await deleteProviderService(serviceId, providerId);

    return res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

//show availability
export const showAllServicesToCustomers = async (req: Request, res: Response) => {
  try {
    const result = await getServicesForCustomers();
    return res.status(200).json(result);
    
  } catch (error) {
    return res.status(500).json({ error: "Failed to get services" });
  }
};


