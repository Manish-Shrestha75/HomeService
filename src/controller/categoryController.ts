import { Request, Response } from 'express';
import * as categoryService from '../service/categoryService';


// Create category
export const createCategoryController = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Category name is required"
      });
    }

    const result = await categoryService.createCategory(name, description);

    if (result.message === "Category created") {
      return res.status(201).json({
        success: true,
        message: result.message,
        data: result.category
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
      message: error.message
    });
  }
};

//get categories
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAllCategoriesService();
    res.json({
      success: true,
      data: categories
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Update category
export const updateCategoryController = async (req: Request, res: Response) => {
  try {
    const categoryId = parseInt(req.params.id);
    const updateData = req.body;

    if (isNaN(categoryId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID"
      });
    }

    const result = await categoryService.updateCategory(categoryId, updateData);

    if (result.message === "Category updated") {
      return res.status(200).json({
        success: true,
        message: result.message,
        data: result.category
      });
    } else {
      return res.status(404).json({
        success: false,
        message: result.message
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete category
export const deleteCategoryController = async (req: Request, res: Response) => {
  try {
    const categoryId = parseInt(req.params.id);

    if (isNaN(categoryId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID"
      });
    }

    const result = await categoryService.deleteCategory(categoryId);

    if (result.message === "Category deleted") {
      return res.status(200).json({
        success: true,
        message: result.message
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
      message: error.message
    });
  }
};