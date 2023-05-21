import { Injectable } from '@nestjs/common';
import { Event } from '../entities/event.entity';
import { EventRepository } from './event.repository';
import { SearchEventDto } from '../dto/search-event.dto';

@Injectable()
export class InMemoryEventRepository implements EventRepository {
  private event: Event[] = [];

  async findById(id: string): Promise<Event | undefined> {
    return this.event.find((event) => event.id === id);
  }

  async search(searchParams: SearchEventDto): Promise<Event[]> {
    return this.event.filter((event) => {
      if (
        searchParams.start_date &&
        searchParams.end_date &&
        event.start_date >= searchParams.start_date &&
        event.end_date <= searchParams.end_date
      ) {
        return true;
      }
      return true;
    });
  }

  async create(event: Event): Promise<Event> {
    this.event.push(event);
    return event;
  }

  async update(event: Event): Promise<Event> {
    const index = this.event.findIndex((e) => e.id === event.id);
    if (index === -1) {
      throw new Error('User not found');
    }
    this.event[index] = event;
    return event;
  }

  async delete(id: string): Promise<void> {
    const index = this.event.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new Error('Event not found');
    }
    this.event.splice(index, 1);
  }
}
