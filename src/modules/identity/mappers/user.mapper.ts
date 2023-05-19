import { User } from "../entities/user.entity";

export class UserMapper {

    static toResponse(user: User | User[]): any {
        if (Array.isArray(user)) {
            return user.map((u) => this.toResponse(u));
        }
        const { id, email, phone, name, password, order } = user;
        return { id, email, phone, name, password, order };
    }

    static toDatabase(user: User): any {
        if (Array.isArray(user)) {
            return user.map((u) => this.toDatabase(u));
        }
        const { id, email, phone, name, password, order, createdAt, updatedAt } = user;
        return { id, email, phone, name, createdAt, password, order, updatedAt };
    }

}
