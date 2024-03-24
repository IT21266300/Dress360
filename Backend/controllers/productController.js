import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// Add a new product
export const createProduct = expressAsyncHandler(async (req, res, next) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;
    const image = req.body.image;
    const colors = req.body.colors.map((color) => ({
      colorName: color.colorName,
      colorStock: color.colorStock,
    }));
    const size = req.body.size;
    const reviews = req.body.reviews.map((review) => ({
      userId: review.userId,
      rating: review.rating,
      comment: review.comment,
    }));

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      image,
      colors,
      size,
      reviews,
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
      updatedProduct.name = req.body.name || updatedProduct.name;
      updatedProduct.description =
        req.body.description || updatedProduct.description;
      updatedProduct.price = req.body.price || updatedProduct.price;
      updatedProduct.category = req.body.category || updatedProduct.category;
      updatedProduct.image = req.body.image || updatedProduct.image;
      updatedProduct.colors = req.body.colors.map((color) => ({
        colorName: color.colorName || updatedProduct.colors[0].colorName,
        colorStock: color.colorStock || updatedProduct.colors[0].colorStock,
      }));
      updatedProduct.size = req.body.size || updatedProduct.size;

      /*
       // reviews allow to update review owner
      updatedProduct.reviews = req.body.reviews.map((review) => ({
        userId: review.userId || updatedProduct.reviews[0].userId,
        rating: review.rating || updatedProduct.reviews[0].rating,
        comment: review.comment || updatedProduct.reviews[0].comment,
      }));
      */

      updatedProduct.reviews = req.body.reviews.map((review) => ({
        userId: review.userId,
        rating: review.rating,
        comment: review.comment,
      }));

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
export const calculateTotalRating = expressAsyncHandler(async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (product) {
      const calRating = product.reviews.reduce((acc, review) => acc + review.rating, 0);
      let totalRatings = calRating / product.reviews.length;
      res.send({message: `Total Ratings`, totalRatings})
    } else {
      res.status(404).send({ message: `Product not found` });
      error.status = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
});


export const calculateTotalStock  = expressAsyncHandler(async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (product) {
      const totalStock = product.colors.reduce((acc, color) => acc + color.colorStock, 0);
      res.send({message: `Total Stock`, totalStock})
    } else {
      res.status(404).send({ message: `Product not found` });
    }
  } catch (error) {
    next(error);
  }
});

