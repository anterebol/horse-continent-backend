import { Controller, Get, HttpCode, UseGuards, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/authGuard/auth.guard';

@Controller('/')
@UseGuards(JwtAuthGuard)
export class MainController {
  @Get()
  @HttpCode(HttpStatus.OK)
  getMain() {}
}
