import { Module } from '@nestjs/common';
import { CreateUserService } from './services/create-user.service';
import { UserRepository } from './repositories/user.repository';
import { InMemoryUserRepository } from './repositories/user-in-memory.reposity';
import { UserController } from './controllers/user.controller';
import { SearchUserService } from './services/search-user.service';
import { DeleteUserService } from './services/delete-user.service';
import { UpdateUserService } from './services/update-user.service';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';

@Module({
  controllers: [UserController, AuthController],
  providers: [
    CreateUserService,
    SearchUserService,
    DeleteUserService,
    UpdateUserService,
    AuthService,
    {
      //TODO: Remove this when we have a database module
      provide: UserRepository,
      useClass: InMemoryUserRepository,
    },
  ],
})
export class IdentityModule { }
