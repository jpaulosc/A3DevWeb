import { SerieRepositoryPrisma } from "../../repository/implements/serie.repository.prisma";
import { GetSerieController } from "./get-serie-controller";

const serieRepository = new SerieRepositoryPrisma();
const getSerieController = new GetSerieController(serieRepository);

export {getSerieController};
