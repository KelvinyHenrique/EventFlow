import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";



@Injectable()
export class DeleteUserService {
  constructor(private readonly userRepository: UserRepository) { }

  async execute(user_id: string): Promise<void> {
    const userExists = await this.userRepository.findById(user_id);
    if (!userExists) {
      throw new Error("User not found");
    }
    await this.userRepository.delete(user_id);
  }
}