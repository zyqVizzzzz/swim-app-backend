import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginResponseDto } from './dto/login-response.dto'; // 导入 DTO
import { User } from '../users/users.interface'; 

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ){}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && await bcrypt.compare(pass, user.password_hash)) {
      const { email, _id } = user;
      return { email, _id };
    }
    return null;
  }

  async login(user: User): Promise<LoginResponseDto> {
    const {email, _id} = user;
    console.log(user)
    const payload = { email, sub: _id.toString() };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}