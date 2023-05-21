import { Injectable } from "@nestjs/common";
import { EventRepository } from "../repositories/event.repository";



@Injectable()
export class DeleteEventService {
    constructor(private readonly eventRepository: EventRepository) { }

    async execute(event_id: string): Promise<void> {
        await this.eventRepository.delete(event_id);
    }
}