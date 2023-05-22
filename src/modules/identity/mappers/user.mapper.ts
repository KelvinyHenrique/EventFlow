import { User } from "../entities/user.entity";
import { UserProps } from "../interfaces/user-props";

export class UserMapper {

    static toResponse(user: UserProps | UserProps[]): any {
        if (Array.isArray(user)) {
            return user.map((u) => this.toResponse(u));
        }
        const { id, email, phone, name, password, order, event } = user;
        return { id, email, phone, name, password, order, event };
    }

    static toDatabase(user: UserProps): any {
        if (Array.isArray(user)) {
            return user.map((u) => this.toDatabase(u));
        }
        const { id, email, phone, name, password, order, createdAt, updatedAt } = user;
        return { id, email, phone, name, createdAt, password, order, updatedAt };
    }

}
