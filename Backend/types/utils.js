import jwt from 'jsonwebtoken';
// import { User } from '../models/userModel.js';

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || 'somethingsecret',
    {
      expiresIn: '30d',
    }
  );
};

const isAuth = (req, res, next) => {
  const { authorization } = req.headers;
  if (authorization) {
    const token = authorization.slice(7); // Remove 'Bearer ' from the beginning
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET || 'somethingsecret');
      req.user = decode;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Invalid Token' });
    }
  } else {
    res.status(401).json({ message: 'No Token' });
  }
};

export { generateToken, isAuth };

