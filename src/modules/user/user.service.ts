import { UpdateUserDto } from './dto/updateUser.dto';
import { UserEntity } from './user.entity';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { Repository } from 'typeorm';
import { NOT_FOUND, errCode } from 'src/constants/constants';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ){}
  async getAll() {
    return (await this.userRepository.find()).map((user) => user.toResponse())
  }
  async getUserByLogin (userDto: LoginDto) {
    const user =  await this.userRepository.findOne({ where: { login: userDto.login }});
    return user.toResponse();
  }
  async addUser(userDto: CreateUserDto) {
    const data = await this.userRepository.create(userDto);
    const user = await this.userRepository.save(data);
    return user.toResponse();
  }
  async chengeUser(userDto: UpdateUserDto, id: string) {
    const user = this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException(NOT_FOUND, errCode);
    } else {
      return (await this.userRepository.save({ ...user, ...userDto }))
    }
  }
  async removeUser(id: string) {
    const res = await this.userRepository.delete(id);
    if (res.affected === 0) {
      throw new HttpException(NOT_FOUND, errCode);
    } else {
      return 'deleted';
    }
  }
}
