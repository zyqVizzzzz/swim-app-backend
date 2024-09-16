import * as mongoose from 'mongoose';

export const SolanaSchema = new mongoose.Schema({
  currentPrice: Number,
  percentage: String,
  date: String,
  tag: String,
});
