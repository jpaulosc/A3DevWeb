import { SerieRepositoryPrisma } from "../../repository/implements/serie.repository.prisma";
import { GetAllSeriesController } from "./get-all-series.controller";


const seriesRepository = new SerieRepositoryPrisma();
const getAllSeriesControler = new GetAllSeriesController(seriesRepository);

export {getAllSeriesControler};
