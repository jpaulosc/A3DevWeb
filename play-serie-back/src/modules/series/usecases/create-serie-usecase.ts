import { Series } from "../entities/series.entity";
import { ISerieRepository } from "../repository/serie.repository";

interface SerieRequest {
  name: string
  description: string
  image: string
  platform: string
  userId: string
}

export class CreateSerieUseCase {
  constructor(private serieRepository: ISerieRepository, private image: string){}
  async execute(data:SerieRequest) {
    const serie = new Series(data);
    const createSerieUseCase = await this.serieRepository.save(serie, this.image);
    return createSerieUseCase;
  }
}
