import { Schema, Document, model } from 'mongoose';

export interface IToken extends Document {
  name: string;
  address: string;
}

export const TokenSchema = new Schema<IToken>({
  name: { type: String, required: true },
  address: { type: String, required: true },
});

export const Token = model<IToken>('Token', TokenSchema);
