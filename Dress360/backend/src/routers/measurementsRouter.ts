import express, { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Measurement, MeasurementModel } from '../models/measurementModel'; // Import Measurement model
import { isAuth } from '../utils'; // Import isAuth middleware

export const MeasurementRouter = express.Router();

// Route to add measurements
MeasurementRouter.post(
  '/addmeasurements',
//   isAuth, // Example middleware, replace with your own authentication logic
  asyncHandler(async (req: Request, res: Response) => {
    try {
      const { height, chest, hip, waist, thigh, outerLeg, innerLeg, neckHipLength, shoulder } = req.body;

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

// Route to update measurements
// userRouter.put(
//   '/updatemeasurements/:id',
//   isAuth, // Example middleware, replace with your own authentication logic
//   asyncHandler(async (req: Request, res: Response) => {
//     try {
//       const { id } = req.params;

//       // Find the measurement by id
//       const measurement = await MeasurementModel.findById(id);

//       if (!measurement) {
//         return res.status(404).send({ error: 'Measurement not found' });
//       }

//       // Check if the authenticated user owns the measurement
//       if (measurement.user.toString() !== req.user._id.toString()) {
//         return res.status(403).send({ error: 'Unauthorized' });
//       }

//       // Update the measurement properties
//       measurement.height = req.body.height || measurement.height;
//       measurement.chest = req.body.chest || measurement.chest;
//       measurement.waist = req.body.waist || measurement.waist;
//       measurement.outerLeg = req.body.outerLeg || measurement.outerLeg;

//       // Save the updated measurement
//       await measurement.save();

//       res.send({ message: 'Measurement updated successfully', measurement });
//     } catch (error) {
//       res.status(500).send({ error: 'Failed to update measurement' });
//     }
//   })
// );