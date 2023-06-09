import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../repositories/user.repository';
import { User } from '../../entities/user.entity';
import { SearchUserDto } from '../../dto/search-user.dto';
import { SearchUserService } from '../../services/search-user.service';
import { faker } from '@faker-js/faker';
import { UserProps } from '../../interfaces/user-props';
import { CreateUserService } from '../../services/create-user.service';
import { DeleteUserService } from '../../services/delete-user.service';
import { UserMapper } from '../../mappers/user.mapper';
import { InMemoryUserRepository } from '../../repositories/user-in-memory.repository';

describe('SearchUserService', () => {
    let searchUserService: SearchUserService;
    let userRepository: UserRepository;
    let createUserService: CreateUserService;
    let createdUser: User;


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SearchUserService,
                CreateUserService,
                DeleteUserService,
                {
                    provide: UserRepository,
                    useClass: InMemoryUserRepository,
                },
            ],
        }).compile();

        searchUserService = module.get<SearchUserService>(SearchUserService);
        userRepository = module.get<UserRepository>(UserRepository);
        createUserService = module.get<CreateUserService>(CreateUserService);
    });

    it('should create a new user', async () => {
        const userProps: UserProps = {
            email: faker.internet.email(),
            phone: faker.phone.number(),
            name: faker.internet.userName(),
            password: faker.internet.password(),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        createdUser = new User(userProps);

        jest.spyOn(userRepository, 'create').mockResolvedValue(createdUser);

        const result: UserProps = await createUserService.execute(createdUser);
        expect(result.id).toBeDefined();
        expect(userRepository.create).toHaveBeenCalledWith(UserMapper.toDatabase(createdUser));
    });
    it('should search for a user by email', async () => {
        // Arrange
        const searchParams: SearchUserDto = {
            email: createdUser.email,
        };

        const expectedUsers: User[] = [createdUser];

        jest.spyOn(userRepository, 'search').mockResolvedValue(expectedUsers);

        const result: UserProps[] = await searchUserService.execute(searchParams);

        expect(result).toEqual(expectedUsers);
        expect(userRepository.search).toHaveBeenCalledWith(searchParams);
    });

    it('should search for a user by id', async () => {
        const searchParams: SearchUserDto = {
            id: createdUser.id,
        };

        const expectedUsers: User[] = [createdUser];

        jest.spyOn(userRepository, 'search').mockResolvedValue(expectedUsers);

        const result: UserProps[] = await searchUserService.execute(searchParams);

        expect(result).toEqual(expectedUsers);
        expect(userRepository.search).toHaveBeenCalledWith(searchParams);
    });

    it('should search for a user by name', async () => {
        const searchParams: SearchUserDto = {
            name: createdUser.name,
        };

        const expectedUsers: User[] = [createdUser];

        jest.spyOn(userRepository, 'search').mockResolvedValue(expectedUsers);

        const result: UserProps[] = await searchUserService.execute(searchParams);

        expect(result).toEqual(expectedUsers);
        expect(userRepository.search).toHaveBeenCalledWith(searchParams);
    });

    it('should search for a user that doesnt exist', async () => {
        const searchParams: SearchUserDto = {
            name: faker.internet.userName(),
        };

        const expectedUsers: User[] = [];

        jest.spyOn(userRepository, 'search').mockResolvedValue(expectedUsers);

        const result: UserProps[] = await searchUserService.execute(searchParams);

        expect(result).toEqual(expectedUsers);
        expect(userRepository.search).toHaveBeenCalledWith(searchParams);
    }
    );
});
