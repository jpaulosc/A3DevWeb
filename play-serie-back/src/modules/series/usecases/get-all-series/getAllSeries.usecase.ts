import { ISerieRepository } from "../../repository/serie.repository";

export class GetallSeriesUseCase {
    constructor(private seriesRepository :ISerieRepository){}
    async execute(){
        const result = await this.seriesRepository.getAll();
        return result;
    }
}
