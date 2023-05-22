import { Injectable } from '@nestjs/common';
import { Event } from '../entities/event.entity';
import { EventRepository } from '../repositories/event.repository';
import { SearchEventDto } from '../dto/search-event.dto';

@Injectable()
export class SearchEventService {
    constructor(private readonly eventRepository: EventRepository) { }

    async execute(searchParams: SearchEventDto): Promise<Event[]> {
        if (searchParams.start_date) {
            searchParams.start_date = new Date(searchParams.start_date);
        }

        if (searchParams.end_date) {
            searchParams.end_date = new Date(searchParams.end_date);
        }

        return await this.eventRepository.search(searchParams);
    }
}
