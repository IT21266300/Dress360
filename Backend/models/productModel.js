import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      // type: mongoose.Schema.Types.ObjectId, === should be change to objectid ===
      type: String,
      // ref: 'Category',
      required: true,
    },
    image: [
      {
        type: String,
      },
    ],
    colors: [
      {
        colorName: {
          type: String,
        },
        colorStock: {
          type: Number,
          default: 0,
        },
      },
    ],
    size: [
      {
        type: String,
      },
    ],
    reviews: [
      {
        userId: {
          // type: mongoose.Schema.Types.ObjectId, === should be change to objectid ===
          type: String,
          // ref: 'User'
        },
        rating: {
          type: Number,
          required: true,
          min: 0,
          max: 5,
        },
        comment: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
