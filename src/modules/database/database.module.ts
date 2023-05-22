import { Module } from "@nestjs/common";
import { UserPrismaRepository } from "./repositories/user-prisma-repository";
import { UserRepository } from "../identity/repositories/user.repository";
import { EventRepository } from "../event/repositories/event.repository";
import { EventPrismaRepository } from "./repositories/event-prisma-repository";


@Module({
    controllers: [],
    providers: [
        {
            provide: UserRepository,
            useClass: UserPrismaRepository,
        },
        {
            provide: EventRepository,
            useClass: EventPrismaRepository,
        }
    ],
    exports: [
        UserRepository,
        EventRepository
    ]

})

export class DatabaseModule { }