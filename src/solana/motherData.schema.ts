import { Schema, Document, model, Types } from 'mongoose';
import { IToken } from './token.schema';

export interface IMotherData extends Document {
  token: Types.ObjectId | IToken;
  percentage: string;
  date: Date;
  currentPrice: number;
}

export const MotherDataSchema = new Schema<IMotherData>({
  token: { type: Types.ObjectId, ref: 'Token', required: true },
  percentage: { type: String, required: true },
  date: { type: Date, required: true },
  currentPrice: { type: Number, required: true },
});

export const MotherData = model<IMotherData>('MotherData', MotherDataSchema);
