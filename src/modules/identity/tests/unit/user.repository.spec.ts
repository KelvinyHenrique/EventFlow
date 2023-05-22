import { Test } from '@nestjs/testing';
import { UserProps } from '../../interfaces/user-props';
import { InMemoryUserRepository } from '../../repositories/user-in-memory.repository';
import { UserRepository } from '../../repositories/user.repository';
import { User } from '../../entities/user.entity';
import { faker } from '@faker-js/faker';

describe('UserRepository', () => {
  let userRepository: UserRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        {
          provide: UserRepository,
          useClass: InMemoryUserRepository,
        },
      ],
    }).compile();

    userRepository = moduleRef.get<UserRepository>(UserRepository);
  });

  describe('findById', () => {
    it('should find a user by ID', async () => {
      const testUser = new User({
        email: 'test@example.com',
        phone: '1234567890',
        name: 'Test User',
        password: 'password',
        createdAt: new Date(),
        updatedAt: new Date(),
        order: [],
      });
      await userRepository.create(testUser);

      const foundUser = await userRepository.findById(testUser.id);

      expect(foundUser).toEqual(testUser);
    });

    it('should return undefined for non-existent user ID', async () => {
      const foundUser = await userRepository.findById('nonexistent-id');

      expect(foundUser).toBeUndefined();
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const testUser = new User({
        email: 'test@example.com',
        phone: '1234567890',
        name: 'Test User',
        password: 'password',
        createdAt: new Date(),
        updatedAt: new Date(),
        order: [],
      });

      const createdUser = await userRepository.create(testUser);

      expect(createdUser).toEqual(testUser);
    });
  });

  describe('update', () => {
    it('should update an existing user', async () => {
      const testUser = new User({
        email: faker.internet.email(),
        phone: faker.phone.number(),
        name: 'Test User',
        password: 'password',
        createdAt: new Date(),
        updatedAt: new Date(),
        order: [],
      });

      const createdUser = await userRepository.create(testUser);

      createdUser.email = faker.internet.email();

      const result = await userRepository.update(createdUser);

      expect(result).toBeTruthy();

      const retrievedUser = await userRepository.findById(createdUser.id);
      expect(retrievedUser?.email).toEqual(createdUser.email);
    });

    it('should throw an error for update with non-existent user ID', async () => {
      const testUser = new User({
        email: faker.internet.email(),
        phone: faker.phone.number(),
        name: faker.internet.userName(),
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date(),
        order: [],
      });

      await expect(userRepository.update(testUser)).rejects.toThrow();
    });
  });

  describe('delete', () => {
    const testUser = new User({
      email: faker.internet.email(),
      phone: faker.phone.number(),
      name: faker.internet.userName(),
      password: faker.internet.password(),
      createdAt: new Date(),
      updatedAt: new Date(),
      order: [],
    });

    it('should delete an existing user', async () => {
      await userRepository.create(testUser);
      const result = await userRepository.delete(testUser.id);
      expect(result).toBeUndefined();
    });

    it('should throw an error for delete with non-existent user ID', async () => {
      await expect(userRepository.delete(testUser.id)).rejects.toThrow();
    });
  });
});
