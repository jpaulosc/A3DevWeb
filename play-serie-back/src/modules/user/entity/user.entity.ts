import {randomUUID} from "crypto";

interface IUserProps {
  name: string
  lastName: string
  email: string
  password: string
}

export class User {
    id: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    isAdmin: boolean;

    constructor(data: IUserProps){

        if(!data.name || !data.lastName) {
            throw new Error ("Name/lastname is required");
        }

        if (!data.email) {
            throw new Error ("Email is required");
        }

        if (!data.password) {
            throw new Error ("Password is required");
        }

        if (data.password.length <6) {
            throw new Error("Password length is incorrect");
        }

        this.id = randomUUID();
        this.name = data.name;
        this.lastName =data.lastName;
        this.email = data.email;
        this.password = data.password;
        this.isAdmin = false;
    }
}
