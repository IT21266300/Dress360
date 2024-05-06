import cors from 'cors';
import { config } from 'dotenv';
import express, { json, urlencoded } from 'express';
import { set, connect, static as expressStatic } from 'mongoose';
import { join } from 'path';

// Import routers (assuming they have been converted to .js files)
import { keyRouter } from './routers/keyRouter';
import { orderRouter } from './routers/orderRouter';
import { productRouter } from './routers/productRouter';
import { seedRouter } from './routers/seedRouter';
import { userRouter } from './routers/userRouter';
import { MeasurementRouter } from './routers/measurementsRouter';

config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/tsmernamazonadb';
set('strictQuery', true);

connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

const app = express();

app.use(cors({
  credentials: true,
  origin: ['http://localhost:5173'], // Adjust origin as needed
}));

app.use(json());
app.use(urlencoded({ extended: true }));

// Mount API routers
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/seed', seedRouter);
app.use('/api/keys', keyRouter);
app.use('/api/measurements', MeasurementRouter);

// Serve static files (if applicable)
app.use(expressStatic(join(__dirname, '../../frontend/dist')));

// Handle frontend routing (if applicable)
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../../frontend/dist/index.html'));
});

const PORT = parseInt(process.env.PORT || '4000', 10);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});