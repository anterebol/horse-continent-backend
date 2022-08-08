import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService){}

  @Get()
  @HttpCode(HttpStatus.OK)
  getUsers() {
    return this.userService.getAll();
  }

  @Post()
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe())
  addUser(@Body() userDto: CreateUserDto) {
    return this.userService.addUser(userDto);
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  chengeUser(@Body() userDto: UpdateUserDto, @Param('id') id: string) {
    return this.userService.chengeUser(userDto, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeUser(@Param('id') id: string) {
    return this.userService.removeUser(id);
  }
}
