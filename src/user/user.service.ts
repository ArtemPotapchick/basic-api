import { User } from "./user.interface";
import { users } from "./user";

export class UserService {
    public findAll(): User[] {
        return users;
    }

    public findById(id: User['id']): User {
        const foundUser = users.find(user => user.id === id);
        if (!foundUser) throw {message: 404};
        return foundUser;
    }

    public add(name: User['name']): User {
        if (!name || users.some(user=>user.name === name)) throw {message: 400};
        const newUser = {id: `${users.length + 1}`, name};
        users.push(newUser);
        return newUser;
    }

    public update(id: User['id'], name: User['name']): User {
        const foundUser = this.findById(id);
        if(!name) throw {message: 400};
        foundUser.name = name;
        return foundUser;
    }

    public delete(id: User['id']): void {
        const foundUser = this.findById(id);
        users.splice(users.indexOf(foundUser), 1);
    }
}