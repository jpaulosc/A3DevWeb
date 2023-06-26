import { Bcrypt } from "../../../../infra/shared/bcrypt.hash";
import { TokenJWT } from "../../../../infra/shared/token/token.jwt";
import { UserRepositoryPrisma } from "../../repository/implements/user.repositoryPrisma";
import { AuthenticateUserController } from "./authenticate-user.controller";

const userRepositoryPrism = new UserRepositoryPrisma();
const passwordHash = new Bcrypt();
const tokenJWT = new TokenJWT();
const authenticateUserController = new AuthenticateUserController(userRepositoryPrism, passwordHash, tokenJWT);
export {authenticateUserController};
