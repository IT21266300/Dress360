import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    size: {
      type: String,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
    sku: {
      type: Number,
      require: true,
    },
    barcode: {
      type: Number,
      require: true,
    },
    tags: { 
      type: String 
    },
    discount: {
      type: Number,
      default: 0,
    },
    discountType: {
      type: String,
    },
    // reviews: [
    //   {
    //     userId: {
    //       // type: mongoose.Schema.Types.ObjectId, === should be change to objectid ===
    //       type: String,
    //       // ref: 'User'
    //     },
    //     rating: {
    //       type: Number,
    //       // required: true,
    //       min: 0,
    //       max: 5,
    //     },
    //     comment: {
    //       type: String,
    //     },
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);
export default Product;
