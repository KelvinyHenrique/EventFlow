import { PrismaClient } from "@prisma/client";
import { SearchEventDto } from "src/modules/event/dto/search-event.dto";
import { EventProps } from "src/modules/event/interfaces/event-props";
import { EventRepository } from "src/modules/event/repositories/event.repository";


export class EventPrismaRepository implements EventRepository {
    constructor(private readonly prisma: PrismaClient) {
        this.prisma = new PrismaClient();
    }

    async findById(id: string): Promise<EventProps | undefined> {
        const event = await this.prisma.event.findUnique({ where: { id } });
        return event ? event : undefined;
    }

    async search(searchParams: SearchEventDto): Promise<EventProps[]> {
        const { name, description, id, start_date, end_date, city, state, country } = searchParams;

        const events = await this.prisma.event.findMany({
            where: {
                name: {
                    contains: name,
                },
                description: {
                    equals: description,
                },
                id: {
                    equals: id,
                },
                // start_date >= start_date && end_date <= end_date
                start_date: {
                    gte: start_date,
                },
                end_date: {
                    lte: end_date,
                }

            },
        });
        return events;
    }

    async create(event: EventProps): Promise<EventProps> {
        const createdEvent = await this.prisma.event.create({
            data: {
                id: event.id,
                name: event.name,
                description: event.description,
                start_date: event.start_date,
                end_date: event.end_date,
                user_id: event.user_id,
                street: event.street,
                number: event.number,
                city: event.city,
                state: event.state,
                country: event.country,
                zip_code: event.zip_code,
                complement: event.complement,
            },
        });
        return createdEvent;
    }

    async update(event: EventProps): Promise<EventProps> {

        const eventExist = await this.prisma.event.findUnique({ where: { id: event.id } });

        if (!eventExist) {
            throw new Error("Event not found");
        }

        const eventDataForUpdate = {
            name: event.name ? event.name : eventExist.name,
            description: event.description ? event.description : eventExist.description,
            start_date: event.start_date ? event.start_date : eventExist.start_date,
            end_date: event.end_date ? event.end_date : eventExist.end_date,
            street: event.street ? event.street : eventExist.street,
            number: event.number ? event.number : eventExist.number,
            city: event.city ? event.city : eventExist.city,
            state: event.state ? event.state : eventExist.state,
            country: event.country ? event.country : eventExist.country,
            zip_code: event.zip_code ? event.zip_code : eventExist.zip_code,
            complement: event.complement ? event.complement : eventExist.complement,
        };

        const updatedEvent = await this.prisma.event.update({
            where: { id: event.id },
            data: eventDataForUpdate,
        });

        return updatedEvent;
    }

    async delete(id: string): Promise<void> {
        await this.prisma.event.delete({ where: { id } });
    }
}