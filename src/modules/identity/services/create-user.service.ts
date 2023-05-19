import { Injectable } from '@nestjs/common';
import { UserProps } from '../interfaces/user-props';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class CreateUserService {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(userProps: UserProps): Promise<User> {

    if (!userProps.email) {
      throw new Error('The email is required');
    }

    if (!userProps.phone) {
      throw new Error('The phone is required');
    }

    if (!userProps.name) {
      throw new Error('The name is required');
    }

    if (!userProps.password) {
      throw new Error('The password is required');
    }


    return await this.userRepository.create(userProps);
  }
}
