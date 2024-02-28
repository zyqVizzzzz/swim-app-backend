import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 创建新用户
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('/email/:email')
  findOneByEmail(@Param('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  // @Post(':id/verify-phone')
  // async sendVerificationCode(@Param('id') id: string, @Body() body: { phoneNumber: string }) {
  //   return await this.usersService.sendVerificationCodeToUser(id, body.phoneNumber);
  // }

  // @Post(':id/confirm-phone')
  // async verifyPhoneNumber(@Param('id') id: string, @Body() body: { code: string }) {
  //   return await this.usersService.verifyUserPhoneNumber(id, body.code);
  // }
}
