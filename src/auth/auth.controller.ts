import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginResponseDto } from './dto/login-response.dto'; // 导入 DTO

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<LoginResponseDto> {
    return this.authService.login(req.user);
  }
}

// zyq@example.com
// 123456
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inp5cUBleGFtcGxlLmNvbSIsInN1YiI6IjY1ZTA2M2IxZmE3MTBiMDIyNTU0MWYyNSIsImlhdCI6MTcwOTI4MTY5NSwiZXhwIjoxNzA5MjgyMjk1fQ.BSKm42vyM6QrSjG96OmY3PqdtKKC5fb4R6Q8-Ny6rIA

// lyx@example.com
// 123456
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imx5eEBleGFtcGxlLmNvbSIsInN1YiI6IjY1ZTFhODYzN2RhOGUzNmU2ZmM1MGZlMyIsImlhdCI6MTcwOTI4NzU5MywiZXhwIjoxNzA5Mjg4MTkzfQ.aSTIRPeJbV3A7XtPhFbTPTTsjN8E-jno4McThuX5d5g