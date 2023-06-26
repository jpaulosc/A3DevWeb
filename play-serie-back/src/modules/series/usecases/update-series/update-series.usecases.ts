import { ISerieRepository } from "../../repository/serie.repository";

export interface SerieRequest {
  name: string
  description: string
  image: string
  platformId: string
}

export class UpdateSeriesUseCase {
    constructor(private serieRepository: ISerieRepository, private data:SerieRequest, private id: string, private image: string){}
    async execute() {
        const serie = await this.serieRepository.findById(this.id);

        if (serie) {
            const result = await this.serieRepository.updatedSerie(this.data, this.id, this.image);
            return result;
        }

        if (!serie) {
            throw new Error("his is Serie not exists");
        }

    }
}
