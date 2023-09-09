import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    const isValid = this.authService.validateUser(email, password);

    if (!isValid) {
      return { status:0, msg: 'Invalid credentials' };
    }

    const token = this.authService.generateToken(1); // Replace with the actual user ID

    return { status:1, token };
  }
}