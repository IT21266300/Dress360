// routers/3dModelRouter.ts

import express, { Request, Response } from 'express';
import { ThreeDModel } from '../models/3Dmodel';

const router = express.Router();

router.get('/tryon', async (req: Request, res: Response) => {
  try {
    const model = await ThreeDModel.findOne({ name: 'FinalBaseMesh.obj' });
    if (!model) {
      return res.status(404).json({ message: 'Model not found' });
    }
    res.json({ path: model.path });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export { router as threeDModelRouter };
