import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('register')
  register(@Body() body) {
    return this.service.register(body);
  }

  @Post('login')
  login(@Body() body) {
    return this.service.login(body);
  }
}
