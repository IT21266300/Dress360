// dependencies
import express from 'express'
import mongoose from 'mongoose'; 
import dotenv from 'dotenv';


/* 
============== routers set ================== 
======== import your router set here ========
*/
import admin from './routes/admin.js';
import orderRouter from './routes/orderRouter.js';
// import userRouter from './routes/userRouter.js';







// backend configs
const app = express();
app.use(express.json());
dotenv.config();

// connect with Mongo Database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to database successfully 🧲'))
  .catch((err) => console.error('Error while connecting to database💩'));

// ????????
var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};
app.use(allowCrossDomain);


/* 
  ========= APIs config ===========
  ===== config your APIs here =====
*/
app.use('/api/admin', admin);
app.use('/api/order', orderRouter);
// app.use('/api/user', userRouter);



const PORT = parseInt(process.env.PORT);
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port} 🚚`));

// errors config
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});