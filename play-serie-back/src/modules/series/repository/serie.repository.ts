import { Series } from "../entities/series.entity";
import { SerieRequest } from "../usecases/update-series/update-series.usecases";

export interface ISerieRepository {
  save(serie: Series, image: string): Promise<Series>
  getAll(): Promise<any[]>
  updatedSerie(serie: SerieRequest, id: string, image: string): Promise<any>
  findById(id: string): Promise<Series>
  deleteSerie(serieId: string): Promise<void>
}
