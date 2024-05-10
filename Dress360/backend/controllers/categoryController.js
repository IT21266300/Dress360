import expressAsyncHandler from 'express-async-handler';
import Category from '../models/categoryModel.js';

export const createCategory = expressAsyncHandler(async (req, res, next) => {
  try {
    const { category } = req.body;


    const newCategory = new Category({
      category,
    });
    await newCategory.save();
    res.send({ message: `New Category Added..!`, newCategory });
  } catch (error) {
    next(error);
  }
});

export const deleteCategory = expressAsyncHandler(async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    if (!categoryId) {
      throw new Error('Category ID is missing');
    }
    const category = await Category.findByIdAndDelete(categoryId);
    res.send({ message: `Category deleted..!` });
  } catch (error) {
    next(error);
  }
});


export const fetchCategories = expressAsyncHandler(async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.send(categories);
    console.log(products);
  } catch (error) {
    next(error);
  }
});
