
export interface EventProps {
    id?: string;
    name: string;
    description: string;
    start_date: Date;
    end_date: Date;
    user_id: string;
    createdAt?: Date;
    updatedAt?: Date;
    street: string;
    number: string;
    city: string;
    state: string;
    country: string;
    zip_code: string;
    complement?: string;
}