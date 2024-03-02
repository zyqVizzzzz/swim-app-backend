import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.interface';
// import { SmsService } from './sms.service';

@Injectable()
export class UsersService {

  constructor(
    @InjectModel('Users') private readonly userModel: Model<User>,
    // private smsService: SmsService
  ){}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...otherFields } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = new this.userModel({
      ...otherFields,
      password_hash: hashedPassword, // 保存加密后的密码
    });
    try {
      await createdUser.save();
      return createdUser;
    } catch (error) {
      if (error.code === 11000) {
        // 11000代表违反唯一性约束
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: string) {
    return this.userModel.findById(id).exec(); // 使用 findById 简化查询
  }

  findOneByEmail(email: string) {
    return this.userModel.findOne({email}).exec();
  }

  update(id: string, updateUserDto: any): Promise<User> {
    return this.userModel.findOneAndUpdate(
      {_id: id},       
      updateUserDto, {
        new: true
      })
  }

  remove(id: string): Promise<User> {
    return this.userModel.findOneAndDelete({_id: id}).exec();
  }

  async follow(othersUserId: string, userId: string): Promise<User> {
    if (othersUserId === userId) {
      throw new Error('You cannot follow yourself');
    }

    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { following: othersUserId } },
      { new: true }
    ).exec();

    await this.userModel.findOneAndUpdate(
      { _id: othersUserId },
      { $addToSet: { follower: userId } }
    ).exec();

    return updatedUser;
  }

  async unfollow(othersUserId: string, userId: string): Promise<User> {
    if (othersUserId === userId) {
      throw new Error('You cannot unfollow yourself');
    }

    const updatedUser = await this.userModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { following: othersUserId } },
      { new: true }
    ).exec();

    await this.userModel.findOneAndUpdate(
      { _id: othersUserId },
      { $pull: { follower: userId } }
    ).exec();

    return updatedUser;
  }

  async blockUser(othersUserId: string, userId: string): Promise<User> {
    if (othersUserId === userId) {
      throw new Error('You cannot block yourself');
    }

    return await this.userModel.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { blocked: othersUserId } },
      { new: true }
    ).exec();
  }

  async unblockUser(othersUserId: string, userId: string): Promise<User> {
    if (othersUserId === userId) {
      throw new Error('You cannot block yourself');
    }

    return await this.userModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { blocked: othersUserId } },
      { new: true }
    ).exec();
  }

  // async sendVerificationCodeToUser(id: string, phoneNumber: string): Promise<void> {
  //   await this.smsService.sendVerificationCode(phoneNumber);
  //   await this.userModel.findOneAndUpdate({ _id: id }, { phoneNumber })
  // }

  // async verifyUserPhoneNumber(id: string, code: string): Promise<boolean> {
  //   const user = await this.userModel.findById(id);
  //   if (!user) {
  //     throw new Error('User not found');
  //   }
  //   const isCodeValid = await this.smsService.verifyCode(user.phoneNumber, code);
  //   if (isCodeValid) {
  //     await this.userModel.findByIdAndUpdate(id, { isPhoneNumberVerified: true });
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
}


