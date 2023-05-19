import { Module } from '@nestjs/common';
import { CreateUserService } from './services/create-user.service';
import { UserRepository } from './repositories/user.repository';
import { InMemoryUserRepository } from './repositories/user-in-memory.reposity';

@Module({
  controllers: [],
  providers: [
    CreateUserService,
    {
      //TODO: Remove this when we hava a database module
      provide: UserRepository,
      useClass: InMemoryUserRepository,
    },
  ],
})
export class IdentityModule {}
