import * as mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  commenter: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

export const PostSchema = new mongoose.Schema({
  title: String,
  content: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: { type: Date, default: Date.now }, // 发布时间
  updatedAt: { type: Date, default: Date.now }, // 最后更新时间
  post_id: Number,
  comments: [CommentSchema],
  // images: [String],
  // sports_data: {
  //   distance: Number,
  //   duration: Number,
  //   calories: Number,
  //   pace: Number
  // },
  // likes_count: {type: Number, default: 0},
  // comments: [{
  //   author_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  //   content: String,
  //   created_at: { type: Date, default: Date.now },
  //   replies: [{
  //     author_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  //     content: String,
  //     created_at: { type: Date, default: Date.now }
  //   }]
  // }],
  // created_at: { type: Date, default: Date.now },
  // updated_at: { type: Date, default: Date.now }
})