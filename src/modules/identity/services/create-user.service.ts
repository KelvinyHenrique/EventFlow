import { Injectable } from '@nestjs/common';
import { UserProps } from '../interfaces/user-props';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { UserMapper } from '../mappers/user.mapper';
import * as crypto from 'crypto';

@Injectable()
export class CreateUserService {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(userProps: UserProps): Promise<User> {
    const hash = crypto.createHash('md5').update(userProps.password).digest('hex');//TODO: move to entity
    userProps.password = hash;
    const user = new User(userProps);
    const userToDatabase = UserMapper.toDatabase(user);
    return await this.userRepository.create(userToDatabase);
  }
}
