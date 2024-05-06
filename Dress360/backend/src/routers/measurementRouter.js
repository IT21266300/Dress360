import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { MeasurementModel } from '../models/measurementModel'; // Assuming measurementModel.js is converted
import { isAuth } from '../utils'; // Assuming utils.js is converted

const router = Router();

// Route to add measurements
router.post(
  '/addmeasurements',
  isAuth, // Example middleware, replace with your own authentication logic 
  asyncHandler(async (req, res) => {
    try {
      const {
        height,
        chest,
        hip,
        waist,
        thigh,
        outerLeg,
        innerLeg,
        neckHipLength,
        shoulder,
      } = req.body;

      // Assuming req.user contains the authenticated user information
      const userId = req.user._id; 

      // Create a new measurement instance
      const measurement = new MeasurementModel({
        user: userId,
        height,
        chest,
        hip,
        waist,
        thigh,
        outerLeg,
        innerLeg,
        neckHipLength,
        shoulder,
      });

      // Save the measurement to the database
      await measurement.save();

      res.status(201).send({ message: 'Measurement added successfully', measurement });
    } catch (error) {
      res.status(500).send({ error: 'Failed to add measurement' });
    }
  })
);

export const MeasurementRouter = router;