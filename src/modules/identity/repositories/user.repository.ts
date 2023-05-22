import { SearchUserDto } from '../dto/search-user.dto';
import { UserProps } from '../interfaces/user-props';

export abstract class UserRepository {
  abstract findById(id: string): Promise<UserProps | undefined>;
  abstract findByEmail(email: string): Promise<UserProps | undefined>;
  abstract create(user: UserProps): Promise<UserProps>;
  abstract update(user: UserProps): Promise<UserProps>;
  abstract delete(id: string): Promise<void>;
  abstract search(searchParams: SearchUserDto): Promise<UserProps[]>;
}
