import { Module } from '@nestjs/common';
import { EventController } from './controllers/event.controller';
import { EventRepository } from './repositories/event.repository';
import { InMemoryEventRepository } from './repositories/event-in-memory.repository';
import { CreateEventService } from './services/create-event.service';
import { SearchEventService } from './services/search-event.service';
import { UpdateEventService } from './services/update-event.service';
import { DeleteEventService } from './services/delete-event.service';

@Module({
    controllers: [EventController],
    providers: [
        CreateEventService,
        SearchEventService,
        UpdateEventService,
        DeleteEventService,
        {
            //TODO: Remove this when we have a database module
            provide: EventRepository,
            useClass: InMemoryEventRepository
        },
    ],
})
export class EventModule { }
