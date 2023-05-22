import { Controller, Get, Post, Body, Query, Delete, Put, Res } from '@nestjs/common';
import { CreateUserService } from '../services/create-user.service';
import { SearchUserDto } from '../dto/search-user.dto';
import { SearchUserService } from '../services/search-user.service';
import { UserProps } from '../interfaces/user-props';
import { DeleteUserService } from '../services/delete-user.service';
import { User } from '../entities/user.entity';
import { UpdateUserService } from '../services/update-user.service';
import { UserMapper } from '../mappers/user.mapper';

@Controller('users')
export class UserController {
    constructor(private readonly createUserService: CreateUserService, private readonly searchUserService: SearchUserService, private readonly deleteUserService: DeleteUserService, private readonly updateUserService: UpdateUserService) { }

    @Post()
    async create(@Body() userProps: UserProps) {
        const user: User = new User(userProps);
        const newUser = await this.createUserService.execute(user);
        return UserMapper.toResponse(newUser);
    }

    @Get()
    async search(@Query() searchParams: SearchUserDto) {
        const searchedUser = await this.searchUserService.execute(searchParams);
        return UserMapper.toResponse(searchedUser);
    }

    @Delete()
    async delete(@Query('id') id: string, @Res() res: any) {
        try {
            await this.deleteUserService.execute(id);
            return res.status(200).json({ message: 'User deleted successfully' });
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    @Put()
    async update(@Body() userProps: UserProps, @Res() res: any) {
        try {
            return await this.updateUserService.execute(userProps);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

}
