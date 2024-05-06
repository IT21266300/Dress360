import { Router } from 'express';

const router = Router();

// /api/keys/paypal
router.get('/paypal', (req, res) => {
  res.json({ clientId: process.env.PAYPAL_CLIENT_ID || 'sb' });
});

export const keyRouter = router; 