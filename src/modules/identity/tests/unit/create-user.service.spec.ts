import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserService } from '../../services/create-user.service';
import { UserRepository } from '../../repositories/user.repository';
import { User } from '../../entities/user.entity';
import { UserProps } from '../../interfaces/user-props';
import { faker } from '@faker-js/faker';

describe('CreateUserService', () => {
  let createUserService: CreateUserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: UserRepository,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    createUserService = module.get<CreateUserService>(CreateUserService);
    userRepository = module.get<UserRepository>(UserRepository);
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

    const createdUser: User = new User(userProps);

    jest.spyOn(userRepository, 'create').mockResolvedValue(createdUser);

    const result: User = await createUserService.execute(userProps);

    expect(result).toBe(createdUser);
    expect(userRepository.create).toHaveBeenCalledWith(createdUser);
  });
});
