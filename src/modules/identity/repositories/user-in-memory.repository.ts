import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserRepository } from './user.repository';
import { SearchUserDto } from '../dto/search-user.dto';

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async findById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async search(searchParams: SearchUserDto): Promise<User[]> {
    return this.users.filter((user) => {

      if (searchParams.email && user.email !== searchParams.email) {
        return false;
      }
      if (searchParams.name && user.name !== searchParams.name) {
        return false;
      }
      if (searchParams.id && user.id !== searchParams.id) {
        return false;
      }
      return true;
    });
  }

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async update(user: User): Promise<User> {
    const index = this.users.findIndex((u) => u.id === user.id);
    if (index === -1) {
      throw new Error('User not found');
    }
    this.users[index] = user;
    return user;
  }

  async delete(id: string): Promise<void> {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    this.users.splice(index, 1);
  }
}
