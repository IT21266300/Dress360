// dependencies
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

/* 
============== routers set ================== 
======== import your router set here ========
*/
import admin from './routes/admin.js';
import { errorHandler } from './middleware/errorHandler.js';
import keyRouter  from './routes/keyRouter.js';
import orderRouter from './routes/orderRouter.js';
// import  productRouter  from './routes/productRouter.js';
import  seedRouter  from './routes/seedRouter.js';
import  userRouter  from './routes/userRouter.js';
// import MeasurementRouter  from './routes/measurementRouter.js';


// admin-dumindu
import ProductRouter from './routes/productRoutes.js';
import CategoryRouter from './routes/categoryRoutes.js';

// backend configs
const app = express();
app.use(express.json());
dotenv.config();

// connect with Mongo Database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to database successfully 🧲'))
  .catch((err) => console.error('Error while connecting to database💩'));

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// CORS configuration
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

/* 
  ========= APIs config ===========
  ===== config your APIs here =====
*/
app.use('/api/admin', admin);
// app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/seed', seedRouter);
app.use('/api/keys', keyRouter);
// app.use('/api/measurements', MeasurementRouter);

// admin-dumindu
app.use('/api/product', ProductRouter);
app.use('/api/category', CategoryRouter);

const PORT = parseInt(process.env.PORT);
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port} 🚚`));

// error handler
app.use(errorHandler);
