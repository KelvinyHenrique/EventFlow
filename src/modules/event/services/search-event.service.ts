import { Injectable } from '@nestjs/common';
import { Event } from '../entities/event.entity';
import { EventRepository } from '../repositories/event.repository';
import { SearchEventDto } from '../dto/search-event.dto';

@Injectable()
export class SearchEventService {
    constructor(private readonly eventRepository: EventRepository) { }

    async execute(searchParams: SearchEventDto): Promise<Event[]> {
        return await this.eventRepository.search(searchParams);
    }
}
