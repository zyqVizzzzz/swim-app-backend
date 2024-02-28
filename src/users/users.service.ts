import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('Users') private readonly userModel: Model<User>
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

  update(id: string, updateUserDto: UpdateUserDto) {
    console.log(id, updateUserDto)
    return this.userModel.findOneAndUpdate({_id: id}, updateUserDto, {
      new: true
    })
  }

  remove(id: string): Promise<User> {
    return this.userModel.findOneAndDelete({_id: id}).exec();
  }
}


