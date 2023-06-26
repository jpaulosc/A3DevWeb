import { UserOnSerie } from "../../entities/userOnSerie.entity";
import { IUserOnSerieRepository } from "../../repository/userOnSerie.repository";

export enum Status {
  DESEJO_ASSISTIR = "DESEJO_ASSISTIR",
  GOSTEI = "GOSTEI"
}

interface IUserOnSerie {
  status?: Status
  userId: string
  serieId: string
}

export class CreateListWishUsecase {
  constructor(private userOnSerie: IUserOnSerieRepository){}
  async execute(data: IUserOnSerie) {
    const userOnSerie = new UserOnSerie(data);
    const result = await this.userOnSerie.save(userOnSerie);
    return result;
  }
}
