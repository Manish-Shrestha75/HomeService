import { Request, Response } from 'express';
import { approveProvider, getBasicReport, rejectProvider, viewAllBookingsForAdmin } from '../service/adminService';


//approve provider
export const approveProviderController = async (req: Request, res: Response) => {
  try {
    const { providerId } = req.params;
    const result = await approveProvider(providerId);
    return res.status(200).json(result);

  } catch (error) {
    return res.status(500).json({message: "Failed to approve provider" });
  }
};

// reject provider
export const rejectProviderController = async (req: Request, res: Response) => {
  try {
    const { providerId } = req.params;
    const result = await rejectProvider(providerId);
    return res.status(200).json(result);

  } catch (error) {
    return res.status(500).json({message: "Failed to reject provider" });
  }
};

// view all booking 
export const viewAllBookings = async (req: Request, res: Response) => {
  try {
    const result = await viewAllBookingsForAdmin();
    return res.status(200).json(result);

  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

export const showReport = async (req: Request, res: Response) => {
  const report = await getBasicReport();
  
  return res.json(report);
};