import { checkUuid } from 'src/utils/uuid/uuid';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserEntity } from './user.entity';
import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { Repository } from 'typeorm';
import { NOT_FOUND, notFoundCode, UnauthorizedCode } from 'src/constants/constants';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
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
  async getUserByLogin (login: string) {
    const user = await this.userRepository.findOne({ where: { login: login }});
    return user;
  }
  async addUser(userDto: CreateUserDto) {
    const { login, password, name, role } = userDto;
    console.log('chek vercel');
    const isUser = await this.userRepository.findOne({where: { login }});
    if (!isUser) {
      // const hashPassword = await bcrypt.hash(
      //   userDto.password,
      //   Number(process.env.SALT),
      // );
      const data = await this.userRepository.create({ login, password, name, role });
      const user = await this.userRepository.save(data);
      return user.toResponse();
    } else {
      throw new HttpException("This user was created before", notFoundCode);
    }
  }
  async chengeUser({ login, password, name, currentLogin, currentPassword }: UpdateUserDto, id: string) {
    checkUuid(id);
    let currectData;
    if (password !== '') {
      currectData = { login, password, name };
    } else {
      currectData = { login, name };
    }
    const currentUser = await this.userRepository.findOne({ where: { login: currentLogin } });
    if (currentUser) {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new HttpException(NOT_FOUND, notFoundCode);
      } else if (currentUser.password === currentPassword) {
        const isUserHas = await this.userRepository.findOne({ where: { login }});
        if (isUserHas && currentUser.login !== login && user.login !== login) {
          throw new HttpException("This user was created before", notFoundCode);
        } else {
          if (user.role === 'admin') {
            return (await this.userRepository.save({ ...user, ...currectData }));
          } 
          if (user.role === 'owner' && user.password === currentPassword) {
            return (await this.userRepository.save({ ...user, ...currectData }));
          } else {
            throw new HttpException("This user was created before", notFoundCode);
          }
        }
      } else {
        throw new HttpException("Incorrect password", 403);
      }
    } else {
      throw new HttpException("Current user not found", notFoundCode);
    }
  }
  async removeUser(id: string, removeDto: removeUserDto ) {
    checkUuid(id);
    const user = await this.userRepository.findOne({ where: { id }});
    const currentUser = await this.userRepository.findOne({ where: { login: removeDto.currentLogin }});
    if (currentUser) {
      if (currentUser?.password === removeDto?.currentPassword && user?.role !== 'owner') {
        const res = await this.userRepository.delete(id);
        if (res.affected === 0) {
          throw new HttpException(NOT_FOUND, notFoundCode);
        } else {
          return 'deleted';
        }
      } else if (user) {
        throw new HttpException(user?.role === 'owner' ? "You can't delete owner" : "incorrect password", notFoundCode);
      } else {
        throw new HttpException(NOT_FOUND, notFoundCode);
      }
    } else {
      throw new HttpException("Current user not found", notFoundCode);
    }
  }
}
