import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() body: { email: string; password: string }) {
        const result = await this.authService.login(body);
        if (!result) return { message: 'Invalid credentials' };
        return result;
    }

    @Post('register')
    async register(
        @Body() body: { email: string; password: string; role?: 'HR' | 'CANDIDATE' }
        ) {
        return this.authService.register(body);
    }

}
