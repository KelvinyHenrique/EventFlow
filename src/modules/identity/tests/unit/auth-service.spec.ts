import { Test } from '@nestjs/testing';
import { AuthService } from '../../services/auth.service';
import { UserRepository } from '../../repositories/user.repository';

describe('AuthService', () => {
    let authService: AuthService;
    let userRepository: UserRepository;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UserRepository,
                    useValue: {
                        findByEmail: jest.fn(),
                    },
                },
            ],
        }).compile();

        authService = moduleRef.get<AuthService>(AuthService);
        userRepository = moduleRef.get<UserRepository>(UserRepository);
    });

    describe('login', () => {
        it('should return true if email and password match', async () => {
            const email = 'test@example.com';
            const password = 'password';

            //jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(email);

            const result = await authService.login(email, password);

            expect(result).toBe(true);
            expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
        });

        it('should return false if email and password do not match', async () => {
            const email = 'test@example.com';
            const password = 'wrongpassword';
            const user = {
                email,
                password: '5f4dcc3b5aa765d61d8327deb882cf99', // MD5 hash of 'password'
            };

            //jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(user);

            const result = await authService.login(email, password);

            expect(result).toBe(false);
            expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
        });
    });
});
