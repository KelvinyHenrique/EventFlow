import { Order } from '../entities/order.entity';

export interface UserProps {
  id?: string;
  email: string;
  phone: string;
  name: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  order?: Order[];
}
