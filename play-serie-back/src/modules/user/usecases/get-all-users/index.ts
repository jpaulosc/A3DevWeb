import { UserRepositoryPrisma } from "../../repository/implements/user.repositoryPrisma";
import { GetAllUsersController } from "./get-all-users.controller";

const userRepositoryPrisma = new UserRepositoryPrisma();

const getAllUsersController = new GetAllUsersController(userRepositoryPrisma);

export {getAllUsersController};
