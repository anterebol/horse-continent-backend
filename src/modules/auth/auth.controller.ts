import {
  Body,
  Controller,
  Post,
  HttpStatus,
  Header,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(readonly authService: AuthService) {}

  @Post()
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  login(@Body() authDto: LoginDto) {
    return this.authService.login(authDto);
  }
}
