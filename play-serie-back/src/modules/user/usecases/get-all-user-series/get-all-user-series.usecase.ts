import { ISerieRepository } from "../../../series/repository/serie.repository";
import { Status } from "../../../series/usecases/create-list-wish/create-list-wish.usecase";
import { IUserRepository } from "../../repository/user.repository";

export class GetAllUserSeriesUseCase {
  constructor(private userRepository: IUserRepository, private serieRepository: ISerieRepository) {}

  async execute(userId: string, status: Status) {
    const userExist = await this.userRepository.findById(userId, status);

    if (!userExist) {
      throw new Error("Este usuário não existe");
    }

    const series = await Promise.all(userExist.series.map(async (userOnSeries: any) => {
      try {
        const serie = await this.serieRepository.findById(userOnSeries.serieId);
        return serie;
      } catch (err: any) {
        console.log(err.message);
      }
    }));

    const uniqueSeries = series.filter((serie, index, self) => {
      return index === self.findIndex((s) => s.id === serie.id);
    });

    return uniqueSeries;
  }
}

