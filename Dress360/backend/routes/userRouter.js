// userRouter.js

import express from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js'; // Assuming you've converted userModel to ES modules
import { generateToken, isAuth } from '../utils.js'; // Assuming utils is also converted

const userRouter = express.Router();

// POST /api/users/signin
userRouter.post(
  '/signin',
  asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
      return;
    }
    res.status(401).json({ message: 'Invalid email or password' });
  })
);

// POST /api/users/signup
userRouter.post(
  '/signup',
  asyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const createdUser = await user.save();
    res.json({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  })
);

// PUT /api/users/profile
userRouter.put(
  '/profile',
  isAuth,
  asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
      return;
    }
    res.status(404).json({ message: 'User not found' });
  })
);

// DELETE /api/users/:id
userRouter.delete(
  '/:id',
  isAuth,
  asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if (user) {
      res.json({ message: 'User removed' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  })
);

export default userRouter;