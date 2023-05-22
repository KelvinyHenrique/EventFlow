import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserService } from '../../services/create-user.service';
import { UserRepository } from '../../repositories/user.repository';
import { User } from '../../entities/user.entity';
import { UserProps } from '../../interfaces/user-props';
import { faker } from '@faker-js/faker';
import { UserMapper } from '../../mappers/user.mapper';
import { InMemoryEventRepository } from 'src/modules/event/repositories/event-in-memory.repository';
import { InMemoryUserRepository } from '../../repositories/user-in-memory.repository';

describe('CreateUserService', () => {
  let createUserService: CreateUserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: UserRepository,
          useClass: InMemoryUserRepository,
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

    const createdUser = new User(userProps);

    jest.spyOn(userRepository, 'create').mockResolvedValue(createdUser);

    const result: UserProps = await createUserService.execute(createdUser);
    expect(result.id).toBeDefined();
    expect(userRepository.create).toHaveBeenCalledWith(UserMapper.toDatabase(createdUser));
  });
});

