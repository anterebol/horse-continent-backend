import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDto } from '../user/dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}
  @Post()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  async signIn (@Body() authDto: LoginDto) {
    const res = await this.authService.login(authDto);
  }
}
