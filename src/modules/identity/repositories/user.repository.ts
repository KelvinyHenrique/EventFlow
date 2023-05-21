import { SearchUserDto } from '../dto/search-user.dto';
import { User } from '../entities/user.entity';
import { UserProps } from '../interfaces/user-props';

export abstract class UserRepository {
  abstract findById(id: string): Promise<User | undefined>;
  abstract findByEmail(email: string): Promise<User | undefined>;
  abstract create(user: UserProps): Promise<User>;
  abstract update(user: UserProps): Promise<User>;
  abstract delete(id: string): Promise<void>;
  abstract search(searchParams: SearchUserDto): Promise<User[]>;
}
