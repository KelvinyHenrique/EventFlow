

export class SearchEventDto {
    id?: string;
    name?: string;
    description?: string;
    start_date?: Date;
    end_date?: Date;
    user_id?: string;
    state: string;
    city: string;
    country: string;
}