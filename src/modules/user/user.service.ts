import { checkUuid } from 'src/utils/uuid/uuid';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserEntity } from './user.entity';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { Repository } from 'typeorm';
import { NOT_FOUND, errCode } from 'src/constants/constants';
import { LoginDto } from './dto/login.dto';
import { removeUserDto } from './dto/deleteUser.dto';

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
    const user = await this.userRepository.findOne({ where: { login: userDto.login }});
    return user.toResponse();
  }
  async addUser(userDto: CreateUserDto) {
    const { login, password, name, role } = userDto;
    const isUser = await this.userRepository.findOne({where: { login }});
    if (!isUser) {
      const data = await this.userRepository.create({ login, password, name, role });
      const user = await this.userRepository.save(data);
      return user.toResponse();
    } else {
      throw new HttpException("This user was created before", errCode);
    }
  }
  async chengeUser({ login, oldPassword, currentPassword, name }: UpdateUserDto, id: string) {
    checkUuid(id);
    const correctData = { login, currentPassword, name };
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException(NOT_FOUND, errCode);
    } else if (user.password === oldPassword) {
      const isUserHas = await this.userRepository.findOne({ where: { login }});
      if (!isUserHas) {
        return (await this.userRepository.save({ ...user, ...correctData }));
      } else {
        throw new HttpException("This user was created before", errCode);
      }
    } else {
      throw new HttpException("Incorrect password", errCode);
    }
  }
  async removeUser(id: string, removeDto: removeUserDto ) {
    checkUuid(id);
    const user = await this.userRepository.findOne({ where: { id }});
    if (user?.password === removeDto?.password && user?.role !== 'owner') {
      const res = await this.userRepository.delete(id);
      if (res.affected === 0) {
        throw new HttpException(NOT_FOUND, errCode);
      } else {
        return 'deleted';
      }
    } else if (user) {
      throw new HttpException(user?.role === 'owner' ? "You can't delete owner" : "incorrect password", errCode);
    } else {
      throw new HttpException(NOT_FOUND, errCode);
    }
  }
}
