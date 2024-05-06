import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { OrderModel } from '../models/orderModel'; // Assuming orderModel.js is converted
import { isAuth } from '../utils'; // Assuming utils.js is converted

const router = Router();

// Get logged-in user's orders
router.get(
  '/mine',
  isAuth,
  asyncHandler(async (req, res) => {
    const orders = await OrderModel.find({ user: req.user._id });
    res.json(orders);
  })
);

// Get order by ID
router.get(
  '/:id',
  isAuth,
  asyncHandler(async (req, res) => {
    const order = await OrderModel.findById(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order Not Found' });
    }
  })
);

// Create new order
router.post(
  '/',
  isAuth,
  asyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).json({ message: 'Cart is empty' });
    } else {
      const order = new OrderModel({
        orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });

      const createdOrder = await order.save();
      res.status(201).json({ message: 'Order Created', order: createdOrder });
    }
  })
);

// Update order to paid
router.put(
  '/:id/pay',
  isAuth,
  asyncHandler(async (req, res) => {
    const order = await OrderModel.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = new Date();
      order.paymentResult = {
        paymentId: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updatedOrder = await order.save();
      res.send({ order: updatedOrder, message: 'Order Paid Successfully' });
    } else {
      res.status(404).json({ message: 'Order Not Found' });
    }
  })
);

export const orderRouter = router;