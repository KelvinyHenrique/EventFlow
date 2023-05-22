import { Module } from '@nestjs/common';
import { CreateUserService } from './services/create-user.service';
import { UserController } from './controllers/user.controller';
import { SearchUserService } from './services/search-user.service';
import { DeleteUserService } from './services/delete-user.service';
import { UpdateUserService } from './services/update-user.service';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [UserController, AuthController],
  providers: [
    CreateUserService,
    SearchUserService,
    DeleteUserService,
    UpdateUserService,
    AuthService
  ],
})
export class IdentityModule { }
