import { Body, Controller, Delete, Get, Post, Put, Query } from "@nestjs/common";
import { CreateEventService } from "../services/create-event.service";
import { SearchEventService } from "../services/search-event.service";
import { UpdateEventService } from "../services/update-event.service";
import { DeleteEventService } from "../services/delete-event.service";
import { SearchEventDto } from "../dto/search-event.dto";
import { Event } from "../entities/event.entity";
import { EventProps } from "../interfaces/event-props";


@Controller('events')
export class EventController {
    constructor(private readonly createEventService: CreateEventService,
        private readonly searchEventService: SearchEventService,
        private readonly updateEventService: UpdateEventService,
        private readonly deleteEventService: DeleteEventService) { }

    @Get()
    async search(@Query() searchParams: SearchEventDto) {
        return await this.searchEventService.execute(searchParams);
    }

    @Post()
    async create(@Body() eventProps: EventProps) {
        return await this.createEventService.execute(eventProps);
    }

    @Put()
    async update(@Body() eventProps: EventProps) {
        return await this.updateEventService.execute(eventProps);
    }

    @Delete()
    async delete(@Query("id") id: string) {
        return await this.deleteEventService.execute(id);
    }
}
