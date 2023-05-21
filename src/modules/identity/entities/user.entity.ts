import { randomUUID } from 'crypto';
import { UserProps } from '../interfaces/user-props';
import { Order } from './order.entity';
import { Email } from './value-objects/email.entity';
import { BaseEntity } from './base.entity';
import * as crypto from 'crypto';

export class User extends BaseEntity {
  private props: UserProps;

  constructor(props: Omit<UserProps, 'id'>, id: string = randomUUID()) {
    super();
    this.props = props;
    this.id = id;
  }

  get id(): string | undefined {
    return this.props.id;
  }

  set id(value: string | undefined) {
    if (value !== undefined && !this.isUUID(value)) {
      throw new Error('ID must be a valid UUID');
    }
    this.props.id = value;
  }

  get email(): string {
    return this.props.email;
  }

  set email(value: string) {
    const email = new Email(value.toLowerCase());
    this.props.email = email.getValue();
  }

  get phone(): string {
    return this.props.phone;
  }

  set phone(value: string) {
    this.props.phone = value;
  }

  get name(): string {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
  }

  get password(): string {
    return this.props.password;
  }

  set password(value: string) {
    const hash = crypto.createHash('md5').update(value).digest('hex');
    this.props.password = hash;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  set createdAt(value: Date) {
    this.props.createdAt = value;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  set updatedAt(value: Date) {
    this.props.updatedAt = value;
  }

  get order(): Order[] {
    return this.props.order;
  }

  set order(value: Order[]) {
    this.props.order = value;
  }

  private isUUID(value: string): boolean {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(value);
  }
}
