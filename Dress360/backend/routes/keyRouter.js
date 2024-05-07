// keyRouter.js

import express from 'express';

const keyRouter = express.Router();

// GET /api/keys/paypal
keyRouter.get('/paypal', (req, res) => {
  res.json({ clientId: process.env.PAYPAL_CLIENT_ID || 'sb' });
});

export default keyRouter;