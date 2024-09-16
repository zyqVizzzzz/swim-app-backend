/* eslint-disable prettier/prettier */
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateLocationDto {
  province?: string;
  city?: string;
  district?: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  nickname?: string;
  avatar_url?: string;
  phoneNumber?: { type: string; unique: true };
  isPhoneNumberVerified?: { type: boolean; default: false };
  signature?: string;
  devices?: [string];
  sports_data?: {
    daily: [string];
    total: object;
  };
  interactions?: [string];
  system_messages?: [string];
  blocked?: Array<any>;
  following?: Array<any>;
  follower: Array<any>;
  posts?: Array<any>;
  personal_info?: {
    gender?: string;
    age?: number;
    location?: UpdateLocationDto;
    bio?: string;
    weight?: string;
    height?: string;
  };
}
