import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import { cloudinary } from '../utils/cloudinary.js';

// Add a new product
export const createProduct = expressAsyncHandler(async (req, res, next) => {
  try {
    const name = req.body.inputName;
    const description = req.body.inputDescription;
    const brand = req.body.inputBrand;
    const price = req.body.inputPrice;
    const category = req.body.inputCategory;
    const image = req.body.inputImage;
    // const size = req.body.inputSize;
    const size = req.body.inputSize.map((size) => ({
      sizeType: size.sizeType,
      quantity: size.quantity,
    }));
    // const quantity = req.body.inputQuantity;
    const tags = req.body.inputTags;
    const discount = req.body.inputDiscount;
    const discountType = req.body.inputDiscountType;
    // const reviews = req.body.reviews.map((review) => ({
    //   userId: review.userId,
    //   rating: review.rating,
    //   comment: review.comment,
    // }));

    const newProduct = new Product({
      name,
      description,
      brand,
      price,
      category,
      image,
      size,
      tags,
      discount,
      discountType,
      // reviews,
    });
    await newProduct.save();
    res.send({ message: `New Product Added..!`, newProduct });
    console.log(`New Product Added: `, newProduct);
  } catch (error) {
    next(error);
  }
});

// fetch * products
export const getProducts = expressAsyncHandler(async (req, res, next) => {
  try {
    const products = await Product.find();
    res.send(products);
    console.log(products);
  } catch (error) {
    next(error);
  }
});

// fetch single product
export const getSingleProduct = expressAsyncHandler(async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (product) {
      res.send({ message: `Product fetched`, product });
    } else {
      res.status(404).send({ message: `Product not found` });
    }
    console.log(product);
  } catch (error) {
    next(error);
  }
});

// fetch category list
export const getCategories = expressAsyncHandler(async (req, res, next) => {
  try {
    const categories = await Product.find().distinct('category');
    res.send({ message: `categories`, categories });
  } catch (error) {
    next(error);
  }
});

// delete product
export const deleteProduct = expressAsyncHandler(async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findByIdAndDelete(productId);
    res.send({ message: `Product deleted..!` });
    console.log(product);
  } catch (error) {
    next(error);
  }
});

// update product
export const updateProduct = expressAsyncHandler(async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const updatedProduct = await Product.findById(productId);

    if (updatedProduct) {
      updatedProduct.name = req.body.inputName || updatedProduct.name;
      updatedProduct.description =
        req.body.inputDescription || updatedProduct.description;
      updatedProduct.brand = req.body.inputBrand || updatedProduct.brand;
      updatedProduct.price = req.body.inputPrice || updatedProduct.price;
      updatedProduct.category = req.body.inputCategory || updatedProduct.category;
      updatedProduct.image = req.body.inputImage || updatedProduct.image;
      updatedProduct.size = req.body.inputSize.map((size) => ({
        sizeType: size.sizeType,
        quantity: size.quantity,
      }));
      updatedProduct.tags = req.body.inputTags || updatedProduct.tags;
      updatedProduct.discount = req.body.inputDiscount || updatedProduct.discount;
      updatedProduct.discountType = req.body.inputDiscountType || updatedProduct.discountType;

      /*
       // reviews allow to update review owner
      updatedProduct.reviews = req.body.reviews.map((review) => ({
        userId: review.userId || updatedProduct.reviews[0].userId,
        rating: review.rating || updatedProduct.reviews[0].rating,
        comment: review.comment || updatedProduct.reviews[0].comment,
      }));
      */

      // updatedProduct.reviews = req.body.reviews.map((review) => ({
      //   userId: review.userId,
      //   rating: review.rating,
      //   comment: review.comment,
      // }));

      await updatedProduct.save();
      res.send({ message: `Product updated..!`, updatedProduct });
    } else {
      res.status(404).send({ message: `Product not found` });
    }
  } catch (error) {
    next(error);
  }
});

// get total ratings count
export const calculateTotalRating = expressAsyncHandler(
  async (req, res, next) => {
    try {
      const productId = req.params.productId;
      const product = await Product.findById(productId);
      if (product) {
        const calRating = product.reviews.reduce(
          (acc, review) => acc + review.rating,
          0
        );
        let totalRatings = calRating / product.reviews.length;
        res.send({ message: `Total Ratings`, totalRatings });
      } else {
        res.status(404).send({ message: `Product not found` });
        error.status = 404;
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }
);

// fetch total stock
export const calculateTotalStock = expressAsyncHandler(
  async (req, res, next) => {
    try {
      const productId = req.params.productId;
      const product = await Product.findById(productId);
      if (product) {
        const totalStock = product.colors.reduce(
          (acc, color) => acc + color.colorStock,
          0
        );
        res.send({ message: `Total Stock`, totalStock });
      } else {
        res.status(404).send({ message: `Product not found` });
      }
    } catch (error) {
      next(error);
    }
  }
);

// fetch * images
export const getAllImages = expressAsyncHandler(async (req, res) => {
  const { resources } = await cloudinary.search
    .expression('folder:dress_360')
    .sort_by('public_id', 'desc')
    .max_results(30)
    .execute();

  const publicIds = resources.map((file) => file.public_id);
  console.log(publicIds);
  res.send(publicIds);
});

// fetch single image
export const getImage = expressAsyncHandler(async (req, res) => {
  const imgId = req.params.imgId;
  const { resources } = await cloudinary.search
    .expression(`folder:dress_360 AND public_id:dress_360/${imgId}`)
    .sort_by('public_id', 'desc')
    .max_results(30)
    .execute();

  const publicIds = resources.map((file) => file.public_id);
  res.send(publicIds);
});

// add new image
export const uploadImage = expressAsyncHandler(async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: 'dress_360',
    });
    console.log(uploadResponse);
    res.json(uploadResponse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ err: 'Something went wrong!' });
  }
});
