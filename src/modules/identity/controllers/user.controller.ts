import { Controller, Get, Post, Body, Query, Delete, Put } from '@nestjs/common';
import { CreateUserService } from '../services/create-user.service';
import { SearchUserDto } from '../dto/search-user.dto';
import { SearchUserService } from '../services/search-user.service';
import { UserProps } from '../interfaces/user-props';
import { DeleteUserService } from '../services/delete-user.service';
import { User } from '../entities/user.entity';
import { UpdateUserService } from '../services/update-user.service';

@Controller('users')
export class UserController {
    constructor(private readonly createUserService: CreateUserService, private readonly searchUserService: SearchUserService, private readonly deleteUserService: DeleteUserService, private readonly updateUserService: UpdateUserService) { }

    @Post()
    async create(@Body() userProps: UserProps): Promise<User> {
        return await this.createUserService.execute(userProps);
    }

    @Get()
    async search(@Query() searchParams: SearchUserDto): Promise<User[]> {
        return await this.searchUserService.execute(searchParams);
    }

    @Delete()
    async delete(@Query() id: string): Promise<void> {
        return await this.deleteUserService.execute(id);
    }

    @Put()
    async update(@Body() userProps: UserProps): Promise<User> {
        return await this.updateUserService.execute(userProps);
    }

}
