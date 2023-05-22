import { Injectable } from '@nestjs/common';
import { UserProps } from '../interfaces/user-props';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UpdateUserService {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(userProps: UserProps): Promise<UserProps> {
        return await this.userRepository.update(userProps);
    }
}
