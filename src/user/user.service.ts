import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>
  ) {}

  async showAll() {
    const users = await this.userRepository.find();
    return users.map(user => user.toReponseObject());
  }

  async login(data: UserDTO) {
    const {username, password} = data;
    const user = await this.userRepository.find({where: {username}});
  }
  register(data: UserDTO) {}
}
