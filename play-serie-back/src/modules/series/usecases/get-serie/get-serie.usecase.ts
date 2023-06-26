import { ISerieRepository } from "../../repository/serie.repository";

export class GetSerieUseCase {
    constructor(private serieRepository: ISerieRepository, private id: string){}
    async execute() {
        const result = await this.serieRepository.findById(this.id);
        if (!result) {
            throw new Error("This Series is not exists");
        }
        return result;
    }
}
