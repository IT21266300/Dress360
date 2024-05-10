import mongoose from "mongoose";

const shippingAddressSchema = new mongoose.Schema({
  fullName: { type: String },
  address: { type: String },
  city: { type: String },
  postalCode: { type: String },
  country: { type: String },
  lat: { type: Number },
  lng: { type: Number },
});

const itemSchema = new mongoose.Schema({
  name: { type: String,  },
  quantity: { type: String,  },
  image: { type: String,  },
  price: { type: Number,  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // Assuming your Product model is named 'Product'
  },
});

const paymentResultSchema = new mongoose.Schema({
  paymentId: { type: String },
  status: { type: String },
  update_time: { type: String },
  email_address: { type: String },
});

const orderSchema = new mongoose.Schema(
  {
    orderItems: [itemSchema],
    shippingAddress: shippingAddressSchema,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming your User model is named 'User'
    },
    paymentMethod: { type: String, },
    paymentResult: paymentResultSchema,
    itemsPrice: { type: Number, default: 0 },
    shippingPrice: { type: Number,  default: 0 },
    taxPrice: { type: Number, default: 0 },
    totalPrice: { type: Number,  default: 0 },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
