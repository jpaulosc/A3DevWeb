import { UserOnSerie } from "../entities/userOnSerie.entity";

export interface IUserOnSerieRepository {
  save(userOnSerie: UserOnSerie): Promise<UserOnSerie>
  findUserAndSerie(userId: string, serieId: string): Promise<any>
  deleteSerieList(userOnSerie: UserOnSerie): Promise<void>
}
