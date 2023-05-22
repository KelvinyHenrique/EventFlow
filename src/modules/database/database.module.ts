import { Module } from "@nestjs/common";
import { UserPrismaRepository } from "./repositories/user-prisma-repository";
import { UserRepository } from "../identity/repositories/user.repository";


@Module({
    controllers: [],
    providers: [
        {
            provide: UserRepository,
            useClass: UserPrismaRepository,
        },
    ],
    exports: [
        UserRepository,
    ]

})

export class DatabaseModule { }