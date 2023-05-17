import { randomUUID } from 'crypto';
import { OrderProps } from '../interfaces/order-props';

export class Order {
  private props: OrderProps;

  constructor(
    props: Omit<OrderProps, 'id' | 'createdAt' | 'updatedAt'>,
    id?: string,
  ) {
    this.props = {
      ...props,
      id: id || randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  get id(): string {
    return this.props.id;
  }

  set id(value: string) {
    if (!this.isUUID(value)) {
      throw new Error('ID must be a valid UUID');
    }
    this.props.id = value;
  }

  private isUUID(value: string): boolean {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(value);
  }
  set user_id(value: string) {
    this.props.user_id = value;
  }

  get user_id(): string {
    return this.props.user_id;
  }

  set event_id(value: string) {
    this.props.event_id = value;
  }

  get event_id(): string {
    return this.props.event_id;
  }

  set value(value: number) {
    this.props.value = value;
  }

  get value(): number {
    return this.props.value;
  }

  set quantity(value: number) {
    this.props.quantity = value;
  }

  get quantity(): number {
    return this.props.quantity;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
