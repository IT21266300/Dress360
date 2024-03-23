import mongoose from "mongoose";
// import { Product } from "./productModel";
// import { User } from "./userModel";

const shippingAddressSchema = new mongoose.Schema({
  fullName: String,
  address: String,
  city: String,
  postalCode: String,
  country: String,
  lat: Number,
  lng: Number,
});

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
  image: { type: Number, required: true },
  price: { type: Number, required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
});

const paymentResultSchema = new mongoose.Schema({
  paymentId: String,
  status: String,
  update_time: String,
  email_address: String,
});

const orderSchema = new mongoose.Schema({
  orderItems: [itemSchema],
  shippingAddress: shippingAddressSchema,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  paymentMethod: { type: String, required: true },
  paymentResult: paymentResultSchema,
  itemsPrice: { type: Number, required: true, default: 0 },
  shippingPrice: { type: Number, required: true, default: 0 },
  taxPrice: { type: Number, required: true, default: 0 },
  totalPrice: { type: Number, required: true, default: 0 },
  isPaid: { type: Boolean, required: true, default: false },
  paidAt: Date,
  isDelivered: { type: Boolean, required: true, default: false },
  deliveredAt: Date,
});

orderSchema.set("timestamps", true); // Enable timestamps

const Order = mongoose.model("Order", orderSchema);

export default Order;
