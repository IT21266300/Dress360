// src/models/3DModel.ts

import { prop, getModelForClass } from '@typegoose/typegoose';

export class ThreeDModel {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public path!: string; // Path to the 3D model file in your server

  @prop({ required: true })
  public description!: string;

  // Add more properties as needed

  // Timestamps
  @prop()
  public createdAt?: Date;

  @prop()
  public updatedAt?: Date;
}

export const ThreeDModelModel = getModelForClass(ThreeDModel);
