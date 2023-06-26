import { User } from "../../../modules/user/entity/user.entity";

export interface IToken {
  create(user: User): string
}
