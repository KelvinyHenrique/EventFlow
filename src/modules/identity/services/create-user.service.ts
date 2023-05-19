import { Injectable } from '@nestjs/common';
import { UserProps } from '../interfaces/user-props';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class CreateUserService {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(userProps: User): Promise<User> {
    const userToDatabase = UserMapper.toDatabase(userProps);
    return await this.userRepository.create(userToDatabase);
  }
}
