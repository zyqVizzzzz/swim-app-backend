import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  user_id: Number,
  email: String,
  password_hash: String,
  nickname: String,
  avatar_url: String,
  signature: String,
  personal_info: {
    gender: String,
    age: Number,
    location: String,
    bio: String,
  },
  devices: [String],
  sports_data: {
    daily: [String],
    total: Object
  },
  interactions: [String],
  system_messages: [String],
  blocked: Array<any>,
  following: Array<any>,
  posts: Array<any>
})
