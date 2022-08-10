import { LoginDto } from './../user/dto/login.dto';
import { UserService } from '../user/user.service';
import { Injectable, HttpException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(authDto: LoginDto) {
    const user = await this.validateUser(authDto);
    return this.generateToken(user);
  }
  private generateToken(user) {
    const payload = { login: user.login, userId: user.id, name: user.name, role: user.role };
    const token = this.jwtService.sign(payload);
    return {
      token: token
    };
  }
  private async validateUser(authDto) {
    const user = await this.userService.getUserByLogin(authDto.login);
    if (user) {
      // const isCorrectPassword = await bcrypt.compare(
      //   authDto.password,
      //   user.password,
      // );
      if (user && (authDto.password === user.password)) {
        return user;
      }
    } else {
      throw new HttpException('login or password is incorrect', 403);
    }
  }
}
