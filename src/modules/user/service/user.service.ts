import { CreateUserDto } from '../dto/create-user.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { checkUuid } from 'src/utils/uuid/uuid';
import { NOT_FOUND } from 'src/constants/constants';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async getAll() {
    const res = await this.userRepository.find();
    return res.map((user) => user.toResponse());
  }
  async createUser(body: CreateUserDto) {
    const createdUser = this.userRepository.create(body);
    const res = await this.userRepository.save(createdUser);
    return res.toResponse();
  }
}
