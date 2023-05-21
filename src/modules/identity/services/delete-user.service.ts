import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";



@Injectable()
export class DeleteUserService {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(user_id: string): Promise<void> {
        await this.userRepository.delete(user_id);
  }
}