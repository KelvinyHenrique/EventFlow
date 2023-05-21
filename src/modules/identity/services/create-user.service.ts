import { Injectable } from '@nestjs/common';
import { UserProps } from '../interfaces/user-props';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class CreateUserService {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(userProps: UserProps): Promise<User> {
    const user = new User(userProps); // TODO: encrypt password in the future
    const userToDatabase = UserMapper.toDatabase(user);
    return await this.userRepository.create(userToDatabase);
  }
}
