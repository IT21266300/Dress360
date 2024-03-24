import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// Add a new product
export const createProduct = expressAsyncHandler(async (req, res) => {
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
    res.send(`New Product Added..!`);
    console.log(`New Product Added: `, newProduct);
  } catch (err) {
    next(err);
  }
});

export const getProducts = expressAsyncHandler(async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
    console.log(products);
  } catch (err) {
    next(err);
  }
});
