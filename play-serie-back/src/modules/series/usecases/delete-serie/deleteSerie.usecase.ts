import { ISerieRepository } from "../../repository/serie.repository";

export class DeleteSerieUseCase {
  constructor(private serieRepository: ISerieRepository){}
  async execute(serieId: string) {
    const serieExist = await this.serieRepository.findById(serieId);

    if (serieExist) {
      await this.serieRepository.deleteSerie(serieId);
    } else {
      throw new Error ("Essa série não existe");
    }
  }
}
