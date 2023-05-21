export class CreateEventDto {
    name: string;
    description: string;
    start_date: Date;
    end_date: Date;
    user_id: string;
    address?: []
}
