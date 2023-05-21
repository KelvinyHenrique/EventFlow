import { randomUUID } from "crypto";
import { EventProps } from "../interfaces/event-props";

export class Event {
    id?: string;
    name: string;
    description: string;
    start_date: Date;
    end_date: Date;
    user_id: string;
    street: string;
    number: string;
    city: string;
    state: string;
    country: string;
    zip_code: string;
    complement?: string;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(props: EventProps) {
        Object.assign(this, props);

        if (!this.id) {
            this.id = randomUUID();
        }

        if (!this.createdAt) {
            this.createdAt = new Date();
        }

        this.updatedAt = new Date();
    }
}
