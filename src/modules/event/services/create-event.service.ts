import { Injectable } from '@nestjs/common';
import { EventProps } from '../interfaces/event-props';
import { Event } from '../entities/event.entity';
import { EventRepository } from '../repositories/event.repository';

@Injectable()
export class CreateEventService {
    constructor(private readonly eventRepository: EventRepository) { }

    async execute(eventProps: EventProps): Promise<Event> {
        const event = new Event(eventProps);
        return await this.eventRepository.create(event);
    }
}
