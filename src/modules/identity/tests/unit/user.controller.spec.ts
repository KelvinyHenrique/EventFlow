import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../../controllers/user.controller';
import { CreateUserService } from '../../services/create-user.service';
import { UserProps } from '../../interfaces/user-props';
import { faker } from '@faker-js/faker';
import { User } from '../../entities/user.entity';
import { UserRepository } from '../../repositories/user.repository';
import { SearchUserService } from '../../services/search-user.service';
import { DeleteUserService } from '../../services/delete-user.service';
import { UpdateUserService } from '../../services/update-user.service';
import { UserMapper } from '../../mappers/user.mapper';
import { InMemoryUserRepository } from '../../repositories/user-in-memory.repository';

describe('Test UserController', () => {
    let userController: UserController;
    let createUserService: CreateUserService;
    let searchUserService: SearchUserService;
    let createdUser: User;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                CreateUserService,
                SearchUserService,
                DeleteUserService,
                UpdateUserService,
                {
                    provide: UserRepository,
                    useClass: InMemoryUserRepository
                },
            ],
        }).compile();

        userController = module.get<UserController>(UserController);
        createUserService = module.get<CreateUserService>(CreateUserService);
        searchUserService = module.get<SearchUserService>(SearchUserService);
    });

    it('should call createUserService.execute and return the result', async () => {
        const userProps: UserProps = {
            email: faker.internet.email(),
            phone: faker.phone.number(),
            name: faker.internet.userName(),
            password: faker.internet.password(),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        };

        const user = new User(userProps);

        jest.spyOn(createUserService, 'execute').mockResolvedValue(user);

        createdUser = await userController.create(userProps);

        expect(createdUser.id).toEqual(user.id);
        expect(createUserService.execute).toHaveBeenCalledWith(expect.objectContaining(userProps));
    });


    it('should search for a user by id and return the result', async () => {
        const expectedUser: User[] = [UserMapper.toDatabase(createdUser)];

        jest.spyOn(searchUserService, 'execute').mockResolvedValue(expectedUser);

        const searchResult = await userController.search({ id: createdUser.id });

        expect(expectedUser).toEqual(searchResult);
        expect(searchUserService.execute).toHaveBeenCalledWith({ id: createdUser.id });
    });

    it('should search for a user by email and return the result', async () => {
        const expectedUser: User[] = [createdUser];

        jest.spyOn(searchUserService, 'execute').mockResolvedValue(expectedUser);

        const searchResult = await userController.search({ email: createdUser.email });

        expect(expectedUser).toEqual(searchResult);
        expect(searchUserService.execute).toHaveBeenCalledWith({ email: createdUser.email });
    });

    it('should search for a user by name and return the result', async () => {
        const expectedUser: User[] = [createdUser];

        jest.spyOn(searchUserService, 'execute').mockResolvedValue(expectedUser);

        const searchResult = await userController.search({ name: createdUser.name });

        expect(expectedUser).toEqual(searchResult);
        expect(searchUserService.execute).toHaveBeenCalledWith({ name: createdUser.name });
    });

    it('should search all users and return the result', async () => {
        const expectedUser: User[] = [createdUser];

        jest.spyOn(searchUserService, 'execute').mockResolvedValue(expectedUser);

        const searchResult = await userController.search({});
        expect(expectedUser).toEqual(searchResult);
        expect(searchUserService.execute).toHaveBeenCalledWith({});
    });

    it('should search for user with invalid params and return an empty array', async () => {
        const expectedUser: User[] = [];

        jest.spyOn(searchUserService, 'execute').mockResolvedValue(expectedUser);

        const searchResult = await userController.search({ name: 'invalid name' });

        expect(expectedUser).toEqual(searchResult);
        expect(searchUserService.execute).toHaveBeenCalledWith({ name: 'invalid name' });
    });
});
