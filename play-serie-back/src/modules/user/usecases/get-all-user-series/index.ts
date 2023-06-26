import { SerieRepositoryPrisma } from "../../../series/repository/implements/serie.repository.prisma";
import { UserRepositoryPrisma } from "../../repository/implements/user.repositoryPrisma";
import { GetAllUserSeriesController } from "./get-all-user-series-controller";


const userRepositoryPrisma = new UserRepositoryPrisma();
const serieRepositoryPrisma = new SerieRepositoryPrisma();

const getAllUserSeriesController = new GetAllUserSeriesController(userRepositoryPrisma, serieRepositoryPrisma);

export {getAllUserSeriesController};
