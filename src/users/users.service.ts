import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.interface';

@Injectable()
export class UsersService<T> {
  constructor(@InjectModel('Users') private readonly userModel: Model<User<T>>){}
  async create(createUserDto: CreateUserDto): Promise<User<T>> {
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
        // MongoDB的错误码11000代表违反唯一性约束
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userModel.findOneAndUpdate({id}, updateUserDto, {
      new: true
    })
  }

  remove(id: number): Promise<User<T>> {
    return this.userModel.findOneAndDelete({id}).exec();
  }
}


