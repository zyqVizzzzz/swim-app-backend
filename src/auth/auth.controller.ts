import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { WeChatLoginDto, WeChatPhoneDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async weChatLogin(@Body() weChatLoginDto: WeChatLoginDto) {
    return this.authService.weChatLogin(weChatLoginDto);
  }

  @Post('getPhoneNumber')
  async getPhoneNumber(@Body() weChatPhoneDto: WeChatPhoneDto) {
    return this.authService.getPhoneNumber(weChatPhoneDto);
  }
}
