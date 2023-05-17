import { randomUUID } from 'crypto';
import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';
import { Email } from '../entities/value-objects/email.entity';
import { faker } from '@faker-js/faker';

describe('User', () => {
  let user: User;

  beforeEach(() => {
    user = new User({
      email: faker.internet.email(),
      phone: faker.phone.number(),
      name: faker.internet.userName(),
      password: faker.internet.password(),
      createdAt: new Date(),
      updatedAt: new Date(),
      order: [
        new Order({
          user_id: randomUUID(),
          event_id: randomUUID(),
          value: faker.number.float({ min: 1, max: 100 }),
          quantity: faker.number.int({ min: 1, max: 10 }),
        }),
      ],
    });
  });

  it('should create a user instance', () => {
    expect(user).toBeInstanceOf(User);
  });

  it('should set and get the email', () => {
    const email = faker.internet.email();
    user.email = email;
    const emailObj = new Email(email.toLowerCase());

    expect(user.email).toEqual(emailObj.getValue());
  });

  it('should set and get the phone', () => {
    const phone = faker.phone.number();
    user.phone = phone;

    expect(user.phone).toEqual(phone);
  });

  it('should set and get the name', () => {
    const name = faker.internet.userName();
    user.name = name;

    expect(user.name).toEqual(name);
  });

  it('should set and get the password', () => {
    const password = faker.internet.password();
    user.password = password;

    expect(user.password).toEqual(password);
  });

  it('should set and get the createdAt date', () => {
    const createdAt = new Date();
    user.createdAt = createdAt;

    expect(user.createdAt).toEqual(createdAt);
  });

  it('should set and get the updatedAt date', () => {
    const updatedAt = new Date();
    user.updatedAt = updatedAt;

    expect(user.updatedAt).toEqual(updatedAt);
  });

  it('should set and get the order', () => {
    const order = [
      new Order({
        user_id: randomUUID(),
        event_id: randomUUID(),
        value: faker.number.float({ min: 1, max: 100 }),
        quantity: faker.number.int({ min: 1, max: 10 }),
      }),
      new Order({
        user_id: randomUUID(),
        event_id: randomUUID(),
        value: faker.number.float({ min: 1, max: 100 }),
        quantity: faker.number.int({ min: 1, max: 10 }),
      }),
    ];
    user.order = order;

    expect(user.order).toEqual(order);
  });

  it('should set and get the ID', () => {
    const id = randomUUID();
    user.id = id;

    expect(user.id).toEqual(id);
  });

  it('should throw an error when setting an invalid ID', () => {
    const invalidId = 'invalid-uuid';

    expect(() => {
      user.id = invalidId;
    }).toThrow('ID must be a valid UUID');
  });
});
