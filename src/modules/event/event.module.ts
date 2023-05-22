import { Module } from '@nestjs/common';
import { EventController } from './controllers/event.controller';
import { CreateEventService } from './services/create-event.service';
import { SearchEventService } from './services/search-event.service';
import { UpdateEventService } from './services/update-event.service';
import { DeleteEventService } from './services/delete-event.service';
import { DatabaseModule } from '../database/database.module';

@Module({
    controllers: [EventController],
    providers: [
        CreateEventService,
        SearchEventService,
        UpdateEventService,
        DeleteEventService
    ],
    imports: [
        DatabaseModule
    ],
})
export class EventModule { }
