import mongoose from 'mongoose';

import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

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
    brand:{
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    size: [
      {
        sizeType: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          default: 0,
          min:0
        },
      },
    ],
    sku: {
      type: Number,
      required: true,
      unique: true, // Ensure uniqueness
      default: 0,
    },
    barcode: {
      type: Number,
      required: true,
      unique: true,
      default: 0,
    },
    tags: {
      type: String,
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

productSchema.plugin(AutoIncrement, {
  inc_field: 'barcode',
  start_seq: 100000,
});
productSchema.plugin(AutoIncrement, { inc_field: 'sku', start_seq: 100000 });

const Product = mongoose.model('Product', productSchema);
export default Product;
