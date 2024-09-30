import * as mongoose from 'mongoose';

export interface Message extends mongoose.Document {
  sender: string; // userId or openId
  receiver: string; // userId or openId
  content: string;
  timestamp: Date;
}

export const MessageSchema = new mongoose.Schema<Message>({
  sender: { type: String, required: true }, // userId or openId
  receiver: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});
