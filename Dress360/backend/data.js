import pkg from 'bcryptjs';
const { hashSync } = pkg;
// import { hashSync } from 'bcryptjs';
// import { User } from './models/userModel.js'; // Assuming userModel.js is converted
// import { Product } from './models/productModel1.js'; // Assuming productModel.js is converted

export const sampleProducts = [
  {
    name: 'Nike Slim shirt',
    slug: 'nike-slim-shirt',
    category: 'Shirts',
    image: '../images/p1.jpg', // Update image paths if needed
    price: 120,
    countInStock: 10,
    brand: 'Nike',
    rating: 4.5,
    numReviews: 10,
    description: 'high quality shirt',
  },
  // ... other sample products
];

export const sampleUsers = [
  {
    name: 'Joe',
    email: 'admin@example.com',
    password: hashSync('123456', 10), // Adjust salt rounds as needed
    isAdmin: true,
  },
  {
    name: 'John',
    email: 'user@example.com',
    password: hashSync('123456', 10),
    isAdmin: false,
  },
];