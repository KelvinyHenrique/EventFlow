import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../repositories/user.repository';
import { User } from '../../entities/user.entity';
import { UserProps } from '../../interfaces/user-props';
import { fa, faker } from '@faker-js/faker';
import { DeleteUserService } from '../../services/delete-user.service';
import { CreateUserService } from '../../services/create-user.service';
import { randomUUID } from 'crypto';
import { UserMapper } from '../../mappers/user.mapper';

describe('DeleteUserService', () => {
  let deleteUserService: DeleteUserService;
  let userRepository: UserRepository;
  let createUserService: CreateUserService;
  let createdUser: User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteUserService,
        CreateUserService,
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    deleteUserService = module.get<DeleteUserService>(DeleteUserService);
    createUserService = module.get<CreateUserService>(CreateUserService);
    userRepository = module.get<UserRepository>(UserRepository);

    jest.clearAllMocks(); // Reset all mock function calls
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

    const result: User = await createUserService.execute(createdUser);
    expect(result.id).toBeDefined();
    expect(userRepository.create).toHaveBeenCalledWith(UserMapper.toDatabase(createdUser));
  });

  it('should delete a user', async () => {
    jest.spyOn(userRepository, 'delete').mockResolvedValue();
    await deleteUserService.execute(createdUser.id);
    expect(userRepository.delete).toHaveBeenCalledWith(createdUser.id);
  });

  it('should try to delete a user that does not exist', async () => {
    const user_id: string = randomUUID();
    jest.spyOn(userRepository, 'delete').mockRejectedValue(new Error());
    await expect(deleteUserService.execute(user_id)).rejects.toThrow();
    expect(userRepository.delete).toHaveBeenCalledWith(user_id);
  });
});
