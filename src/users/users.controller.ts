import { Controller, Get, Post, Body, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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

  @Post('follow/:othersUserId')
  @UseGuards(JwtAuthGuard)
  follow(@Param('othersUserId') othersUserId: string, @Req() req: any) {
    return this.usersService.follow(othersUserId, req.user.userId)
  }

  @Post('unfollow/:othersUserId')
  @UseGuards(JwtAuthGuard)
  unfollow(@Param('othersUserId') othersUserId: string, @Req() req: any) {
    return this.usersService.unfollow(othersUserId, req.user.userId)
  }

  @Post('block/:othersUserId')
  @UseGuards(JwtAuthGuard)
  blockUser(@Param('othersUserId') othersUserId: string, @Req() req: any){
    return this.usersService.blockUser(othersUserId, req.user.userId)
  }

  @Post('unblock/:othersUserId')
  @UseGuards(JwtAuthGuard)
  unblockUser(@Param('othersUserId') othersUserId: string, @Req() req: any){
    return this.usersService.unblockUser(othersUserId, req.user.userId)
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
