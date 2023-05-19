import { Injectable } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { UserRepository } from "../repositories/user.repository";
import { SearchUserDto } from "../dto/search-user.dto";


@Injectable()
export class SearchUserService {
  constructor(private readonly userRepository: UserRepository) {}

    async execute(searchParams: SearchUserDto): Promise<User[]> {
        return await this.userRepository.search(searchParams);
  }
}