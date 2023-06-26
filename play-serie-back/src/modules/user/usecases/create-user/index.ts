import { Bcrypt } from "../../../../infra/shared/bcrypt.hash";
import { UserRepositoryPrisma } from "../../repository/implements/user.repositoryPrisma";
import { CreateUserController } from "./create-user.controller";

const userRepositoryPrisma = new UserRepositoryPrisma();
const bcryptHashPassword = new Bcrypt();
const createUserController = new CreateUserController(userRepositoryPrisma, bcryptHashPassword);

export {createUserController};
