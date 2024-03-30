import { modelOptions, prop, getModelForClass, Ref } from '@typegoose/typegoose';
import { User } from './userModel'; 

@modelOptions({ schemaOptions: { timestamps: true } })
export class Measurement {
  public _id?: string;

  @prop({ required: true, ref: User })
  public user!: Ref<User>;

  @prop({ required: true })
  public height!: number;

  @prop({ required: true })
  public chest!: number;

  @prop({ required: true })
  public hip!: number;

  @prop({ required: true })
  public waist!: number;

  @prop({ required: true })
  public thigh!: number;

  @prop({ required: true })
  public outerLeg!: number;

  @prop({ required: true })
  public innerLeg!: number;

  @prop({ required: true })
  public neckHipLength!: number;

  @prop({ required: true })
  public shoulder!: number;

}

export const MeasurementModel = getModelForClass(Measurement);