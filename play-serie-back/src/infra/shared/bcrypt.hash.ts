import { IPasswordHash } from "./passwordHash";
import {hash, compare} from "bcryptjs";

export class Bcrypt implements IPasswordHash {
    async hashPassword(password: string): Promise<string> {
        return hash(password, 10);
    }
    async valite(password: string, passwordHash: string): Promise<boolean> {
        return compare(password, passwordHash);
    }

}
