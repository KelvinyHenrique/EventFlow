import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { SearchUserDto } from "../dto/search-user.dto";
import { UserProps } from "../interfaces/user-props";


@Injectable()
export class SearchUserService {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(searchParams: SearchUserDto): Promise<UserProps[]> {
    return await this.userRepository.search(searchParams);
  }
}