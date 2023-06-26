import { SerieRepositoryPrisma } from "../repository/implements/serie.repository.prisma";
import { CreateSerieController } from "./create-serie.controller";

const serieRepositoryPrisma = new SerieRepositoryPrisma();
const createSerieController = new CreateSerieController(serieRepositoryPrisma);
export {createSerieController};
