import { SerieRepositoryPrisma } from "../../repository/implements/serie.repository.prisma";
import { DeleteSerieController } from "./deleteSerie.controller";

const serieRepositoryPrisma = new SerieRepositoryPrisma();

const deleteSerieController = new DeleteSerieController(serieRepositoryPrisma);

export {deleteSerieController};
