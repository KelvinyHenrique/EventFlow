import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {

    constructor(private readonly userRepository: UserRepository) { }

    async login(email: string, password: string) {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            return false;
        }

        const hash = crypto.createHash('md5').update(password).digest('hex');
        if (user.password === hash) {
            return true;
        } else {
            return false;
        }
    }
}
