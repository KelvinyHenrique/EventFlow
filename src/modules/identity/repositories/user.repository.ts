import { User } from '../entities/user.entity';

export abstract class UserRepository {
  abstract findById(id: string): Promise<User | undefined>;
  abstract findByEmail(email: string): Promise<User | undefined>;
  abstract create(user: User): Promise<User>;
  abstract update(user: User): Promise<User>;
  abstract delete(id: string): Promise<void>;
}
