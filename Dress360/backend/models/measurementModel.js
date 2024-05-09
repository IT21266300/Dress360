// measurementModel.js

import mongoose from "mongoose";

const measurementSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming your User model is named 'User'
      required: true,
    },
    height: { type: Number, required: true },
    chest: { type: Number, required: true },
    hip: { type: Number, required: true },
    waist: { type: Number, required: true },
    thigh: { type: Number, required: true },
    outerLeg: { type: Number, required: true },
    innerLeg: { type: Number, required: true },
    neckHipLength: { type: Number, required: true },
    shoulder: { type: Number, required: true },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

const Measurement = mongoose.model("Measurement", measurementSchema);

export default Measurement;
