import { SearchEventDto } from '../dto/search-event.dto';
import { Event } from '../entities/event.entity';

export abstract class EventRepository {
    abstract findById(id: string): Promise<Event | undefined>;
    abstract create(event: Event): Promise<Event>;
    abstract update(event: Event): Promise<Event>;
    abstract delete(id: string): Promise<void>;
    abstract search(searchParams: SearchEventDto): Promise<Event[]>;
}
