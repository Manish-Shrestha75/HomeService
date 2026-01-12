import { AppDataSource } from '../config/database';
import { Category } from '../entities/category.entity';

const categoryRepository = AppDataSource.getRepository(Category);

//create category
export const createCategory = async (name: string, description?: string) => {
  const existing = await categoryRepository.findOne({
    where: { name }
  });

  if (existing) {
    return {
      message: "Category already exists"
    };
  }

  const category = categoryRepository.create({
    name,
    description,
    isActive: true
  });

  const savedCategory = await categoryRepository.save(category);

  return {
    message: "Category created",
    category: savedCategory
  };
};

//get categories
export const getAllCategoriesService = async () => {
  const category =  await categoryRepository.find({
    where: { isActive: true }
  });

  return{
    data: category
  }
};


//update category
export const updateCategory = async (categoryId: number,updateData: {  name?: string;  description?: string;  isActive?: boolean; }) => {
  
  const category = await categoryRepository.findOne({
    where: {id: categoryId.toString() }
  });

  if (!category) {
    return {
      message: "Category not found"
    };
  }

  if (updateData.name !== undefined) category.name = updateData.name;
  if (updateData.description !== undefined) category.description = updateData.description;
  if (updateData.isActive !== undefined) category.isActive = updateData.isActive;
 
  category.updatedAt = new Date();

  await categoryRepository.save(category);

  return {
    message: "Category updated",
    category
  };
};

// delete category
export const deleteCategory = async (categoryId: number) => {
  
  const category = await categoryRepository.findOne({
    where: {id: categoryId.toString() },
    
  });

  if (!category) {
    return {
      message: "Category not found"
    };
  }

  category.isActive = false;
  category.updatedAt = new Date();
  await categoryRepository.save(category);

  return { message: "Category deleted" };
};