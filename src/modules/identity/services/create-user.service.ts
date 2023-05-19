import { Injectable } from '@nestjs/common';
import { UserProps } from '../interfaces/user-props';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class CreateUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userProps: UserProps): Promise<User> {
    const user = new User(userProps);
    return await this.userRepository.create(user);
  }
}
