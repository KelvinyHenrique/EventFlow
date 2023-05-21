import { Injectable } from '@nestjs/common';
import { EventProps } from '../interfaces/event-props';
import { EventRepository } from '../repositories/event.repository';
import { Event } from '../entities/event.entity';

@Injectable()
export class UpdateEventService {
    constructor(private readonly eventRepository: EventRepository) { }

    async execute(eventProps: EventProps): Promise<Event> {
        return await this.eventRepository.update(eventProps);
    }
}
