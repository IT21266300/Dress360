// import { sign, verify } from 'jsonwebtoken';
// import { User } from './models/userModel.js'; // Assuming userModel.js is converted
import jwt from 'jsonwebtoken';

export function generateToken(user) {
  const payload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  };
  return sign(
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
}

export function isAuth(req, res, next) {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // Bearer xxxxx
    verify(
      token,
      process.env.JWT_SECRET || 'somethingsecret',
      (err, decode) => {
        if (err) {
          res.status(401).json({ message: 'Invalid Token' });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    res.status(401).json({ message: 'No Token' });
  }
}