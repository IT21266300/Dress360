// models/3dModel.ts

import mongoose, { Document } from 'mongoose';

export interface ThreeDModel extends Document {
  name: string;
  path: string;
}

const threeDModelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  path: { type: String, required: true }
});

export const ThreeDModel = mongoose.model<ThreeDModel>('ThreeDModel', threeDModelSchema);
