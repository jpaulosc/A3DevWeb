import { SerieRepositoryPrisma } from "../../repository/implements/serie.repository.prisma";
import { UpdateSeriesController } from "./update-series.controller";

const serieRepository = new SerieRepositoryPrisma();
const updateSerieController = new UpdateSeriesController(serieRepository);

export {updateSerieController};
