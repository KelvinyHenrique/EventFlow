import { Injectable } from '@nestjs/common';
import { UserProps } from '../interfaces/user-props';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UpdateUserService {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(userProps: UserProps): Promise<User> {
        return await this.userRepository.update(userProps);
    }
}
