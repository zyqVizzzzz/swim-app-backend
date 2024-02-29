import * as mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
  province: String,
  city: String,
  district: String
});

export const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  nickname: String,
  phoneNumber: {type: String, unique: true},
  isPhoneNumberVerified: { type: Boolean, default: false },
  avatar_url: String,
  signature: String,
  personal_info: {
    gender: String,
    age: Number,
    location: {type: LocationSchema, default: {}},
    bio: String,
    weight: String,
    height: String,
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
  follower: Array<any>,
  posts: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Post'
  }]
})
