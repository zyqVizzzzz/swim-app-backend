import * as mongoose from 'mongoose';

const LocationSchema = new mongoose.Schema({
  province: String,
  city: String,
  district: String,
});

const PersonalDataSchema = new mongoose.Schema({
  gender: String,
  birthday: Date,
  height: Number,
  weight: Number,
  location: { type: LocationSchema, default: {} },
});

const SwimmingDataSchema = new mongoose.Schema({
  distance: Number,
  time: Number,
  average_pace: Number,
  calories_burned: Number,
  pool_length: Number,
  laps: Number,
  date: { type: Date, default: Date.now },
});

const AccountSettingsSchema = new mongoose.Schema({
  // 根据您的账户设置需求添加字段
  language: String,
  notifications: Boolean,
});

export const UserSchema = new mongoose.Schema({
  // 微信小程序特有的用户标识符
  openId: { type: String, required: true, unique: true },
  userId: { type: String, unique: true },
  // 微信授权获取的手机号和昵称
  phone_number: { type: String, unique: true },
  is_phone_number_verified: { type: Boolean, default: true }, // 微信授权的手机号默认已验证
  nickname: { type: String, required: true },
  profile_pic: String, // 用户头像 URL
  signature: String, // 简介
  monthly_goal: Number,
  personal_data: { type: PersonalDataSchema, default: {} },
  points: { type: Number, default: 0 },
  devices: [{ type: String }], // 设备列表
  badge_list: [{ type: String }], // 勋章列表
  swimming_data_list: [{ type: SwimmingDataSchema }], // 游泳数据列表
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // 关注列表
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // 粉丝列表
  account_settings: { type: AccountSettingsSchema, default: {} },
  created_at: { type: Date, default: Date.now },
  // 其他字段
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
});
