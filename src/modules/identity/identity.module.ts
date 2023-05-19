import { Module } from '@nestjs/common';
import { CreateUserService } from './services/create-user.service';
import { UserRepository } from './repositories/user.repository';
import { InMemoryUserRepository } from './repositories/user-in-memory.reposity';
import { UserController } from './controllers/user.controller';
import { SearchUserService } from './services/search-user.service';
import { DeleteUserService } from './services/delete-user.service';
import { UpdateUserService } from './services/update-user.service';

@Module({
  controllers: [UserController],
  providers: [
    CreateUserService,
    SearchUserService,
    DeleteUserService,
    UpdateUserService,
    {
      //TODO: Remove this when we hava a database module
      provide: UserRepository,
      useClass: InMemoryUserRepository,
    },
  ],
})
export class IdentityModule { }
