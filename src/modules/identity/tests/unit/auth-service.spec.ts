import { Test } from '@nestjs/testing';
import { AuthService } from '../../services/auth.service';
import { UserRepository } from '../../repositories/user.repository';
import { UserProps } from '../../interfaces/user-props';
import { faker } from '@faker-js/faker';
import { User } from '../../entities/user.entity';
import { CreateUserService } from '../../services/create-user.service';
import { UserMapper } from '../../mappers/user.mapper';

describe('AuthService', () => {
    let authService: AuthService;
    let userRepository: UserRepository;
    let createUserService: CreateUserService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                AuthService,
                CreateUserService,
                {
                    provide: UserRepository,
                    useValue: {
                        findByEmail: jest.fn(),
                        create: jest.fn(),
                    },
                },
            ],
        }).compile();

        authService = moduleRef.get<AuthService>(AuthService);
        userRepository = moduleRef.get<UserRepository>(UserRepository);
        createUserService = moduleRef.get<CreateUserService>(CreateUserService);
    });

    describe('login', () => {
        it('should return true if email and password match', async () => {
            // Arrange
            const userProps: UserProps = {
                email: faker.internet.email(),
                phone: faker.phone.number(),
                name: faker.internet.userName(),
                password: faker.internet.password(),
                createdAt: new Date(),
                updatedAt: new Date(),
            };
            const userDataToSave = new User(userProps);

            jest.spyOn(userRepository, 'create').mockResolvedValue(userDataToSave);
            jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(userDataToSave);

            // Act
            const createdUser: User = await createUserService.execute(userDataToSave);
            const result = await authService.login(createdUser.email, userProps.password);

            // Assert
            expect(createdUser.id).toBeDefined();
            expect(userRepository.create).toHaveBeenCalledWith(UserMapper.toDatabase(createdUser));
            expect(userRepository.findByEmail).toHaveBeenCalledWith(createdUser.email);
            expect(result).toBe(true);
        });

        it('should return false if email and password do not match', async () => {
            // Arrange
            const email = 'test@example.com';
            const password = 'wrongpassword';

            jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);

            // Act
            const result = await authService.login(email, password);

            // Assert
            expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
            expect(result).toBe(false);
        });
    });
});
