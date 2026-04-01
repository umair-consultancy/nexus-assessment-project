import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IResponse } from '../../common/interfaces/response.interface';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<IResponse<Awaited<ReturnType<AuthService['register']>>>> {
    const data = await this.authService.register(registerDto);
    return {
      success: true,
      data,
      message: 'User registered successfully',
    };
  }

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<IResponse<Awaited<ReturnType<AuthService['login']>>>> {
    const data = await this.authService.login(loginDto);
    return {
      success: true,
      data,
      message: 'Login successful',
    };
  }
}
