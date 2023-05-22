import { PrismaClient } from "@prisma/client";
import { SearchUserDto } from "src/modules/identity/dto/search-user.dto";
import { User } from "src/modules/identity/entities/user.entity";
import { UserProps } from "src/modules/identity/interfaces/user-props";
import { UserRepository } from "src/modules/identity/repositories/user.repository";

export class UserPrismaRepository implements UserRepository {
    constructor(private readonly prisma: PrismaClient) {
        this.prisma = new PrismaClient();
    }

    async findById(id: string): Promise<UserProps | undefined> {
        const user = await this.prisma.user.findUnique({ where: { id }, });
        return user ? user : undefined;
    }

    async findByEmail(email: string): Promise<UserProps | undefined> {
        const user = await this.prisma.user.findUnique({ where: { email } });
        return user ? user : undefined;
    }

    async search(searchParams: SearchUserDto): Promise<UserProps[]> {
        const { name, email, id } = searchParams;

        const users = await this.prisma.user.findMany({
            include: {
                event: true,
            },
            where: {
                name: {
                    contains: name,
                },
                email: {
                    equals: email,
                },
                id: {
                    equals: id,
                },
            },
        });
        return users;
    }

    async create(user: UserProps): Promise<UserProps> {
        const createdUser = await this.prisma.user.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                password: user.password,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        });
        return createdUser;
    }

    async update(user: UserProps): Promise<UserProps> {

        const userExist = await this.prisma.user.findUnique({ where: { id: user.id } });

        if (!userExist) {
            throw new Error("User not found");
        }

        const userDataForUpdate = {
            name: user.name ? user.name : userExist.name,
            email: user.email ? user.email : userExist.email,
            phone: user.phone ? user.phone : userExist.phone,
            password: user.password ? user.password : userExist.password,
        };

        const updatedUser = await this.prisma.user.update({
            where: {
                id: user.id,
            },
            data: userDataForUpdate,
        });
        return updatedUser;
    }

    async delete(id: string): Promise<void> {
        const userExists = await this.prisma.user.findUnique({ where: { id } });
        if (!userExists) {
            throw new Error("User not found");
        }
        await this.prisma.user.delete({ where: { id } });
    }
}
