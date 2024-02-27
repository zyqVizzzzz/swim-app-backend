import { Injectable } from '@nestjs/common';
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
    
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(id: number) {
    return this.userModel.find({id}).exec();
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

// Service 负责数据存储和检索，由 provider 来使用
// 因此 用 Injectable 来装饰这个类


