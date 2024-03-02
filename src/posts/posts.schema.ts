import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
  content: { type: String, required: true },
  images: [String],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: { type: Date, default: Date.now }, // 发布时间
  updatedAt: { type: Date, default: Date.now }, // 最后更新时间
  post_id: Number,
  // images: [String],
  // sports_data: {
  //   distance: Number,
  //   duration: Number,
  //   calories: Number,
  //   pace: Number
  // },
  likes_count: { type: Number, default: 0 },
  likes_users: [String],
});
