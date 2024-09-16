import { Document } from 'mongoose';

export interface User extends Document {
  openId: string;
  userId?: string;
  phone_number?: string;
  is_phone_number_verified?: boolean;
  nickname: string;
  profile_pic?: string;
  signature?: string;
  monthly_goal?: number;
  personal_data?: any; // 根据实际情况定义类型
  points?: number;
  devices?: string[];
  badge_list?: string[];
  swimming_data_list?: any[]; // 根据实际情况定义类型
  following?: string[];
  followers?: string[];
  account_settings?: any; // 根据实际情况定义类型
  created_at?: Date;
  posts?: string[];
}
