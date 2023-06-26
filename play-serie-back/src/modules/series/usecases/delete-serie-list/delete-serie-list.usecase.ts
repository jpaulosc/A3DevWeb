import { IUserOnSerieRepository } from "../../repository/userOnSerie.repository";

interface deleteSerieRequest {
  userId: string
  serieId: string
}

export class DeleteSerieListUsecase {
  constructor(private userOnSerieRepository: IUserOnSerieRepository){}
  async execute(data: deleteSerieRequest) {
    const info = await this.userOnSerieRepository.findUserAndSerie(data.userId, data.serieId);

    if (info) {
      await this.userOnSerieRepository.deleteSerieList(info);
    }
  }
}
