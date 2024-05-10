import expressAsyncHandler from 'express-async-handler';
import Category from '../models/categoryModel.js';
import DiscountType from '../models/discountModel.js';
import SizeType from '../models/sizeModel.js';

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


// discounts

export const createDiscountType = expressAsyncHandler(async (req, res, next) => {
  try {
    const { type } = req.body;


    const newDiscountType = new DiscountType({
      type,
    });
    await newDiscountType.save();
    res.send({ message: `New Category Added..!`, newDiscountType });
  } catch (error) {
    next(error);
  }
});


export const deleteDiscountType = expressAsyncHandler(async (req, res, next) => {
  try {
    const discountId = req.params.discountId;
    if (!discountId) {
      throw new Error('Category ID is missing');
    }
    const category = await DiscountType.findByIdAndDelete(discountId);
    res.send({ message: `Category deleted..!` });
  } catch (error) {
    next(error);
  }
});


export const fetchDiscountType = expressAsyncHandler(async (req, res, next) => {
  try {
    const discountTypes = await DiscountType.find();
    res.send(discountTypes);
    console.log(discountTypes);
  } catch (error) {
    next(error);
  }
});



// sizes

export const createSizeType = expressAsyncHandler(async (req, res, next) => {
  try {
    const { size } = req.body;


    const newSizeType = new SizeType({
      size,
    });
    await newSizeType.save();
    res.send({ message: `New Category Added..!`, newSizeType });
  } catch (error) {
    next(error);
  }
});


export const deleteSizeType = expressAsyncHandler(async (req, res, next) => {
  try {
    const sizeId = req.params.sizeId;
    if (!sizeId) {
      throw new Error('Category ID is missing');
    }
    const size = await SizeType.findByIdAndDelete(sizeId);
    res.send({ message: `Category deleted..!` });
  } catch (error) {
    next(error);
  }
});


export const fetchSizeType = expressAsyncHandler(async (req, res, next) => {
  try {
    const sizeTypes = await SizeType.find();
    res.send(sizeTypes);
    console.log(sizeTypes);
  } catch (error) {
    next(error);
  }
});
