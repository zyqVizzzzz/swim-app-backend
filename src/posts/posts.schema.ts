import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
  author_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  post_id: Number,
  content: String,
  images: [String],
  sports_data: {
    distance: Number,
    duration: Number,
    calories: Number,
    pace: Number
  },
  likes_count: {type: Number, default: 0},
  comments: [{
    author_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    content: String,
    created_at: { type: Date, default: Date.now },
    replies: [{
      author_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      content: String,
      created_at: { type: Date, default: Date.now }
    }]
  }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
})