import { Status } from "../../series/usecases/create-list-wish/create-list-wish.usecase";
import { User } from "../entity/user.entity";

export interface IUserRepository {
  findByEmail(email:string): Promise<User | null>
  findById(id:string, status: Status): Promise<any>
  save(user: User): Promise<User>
  getAllUsers(): Promise<User[]>
}
