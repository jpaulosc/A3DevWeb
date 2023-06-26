import { Request, Response } from "express";
import { GetAllUserSeriesUseCase } from "./get-all-user-series.usecase";
import { IUserRepository } from "../../repository/user.repository";
import { ISerieRepository } from "../../../series/repository/serie.repository";
import { Status } from "../../../series/usecases/create-list-wish/create-list-wish.usecase";

export class GetAllUserSeriesController {
  constructor(private userRepository: IUserRepository, private serieRepository: ISerieRepository){}
  async handle(request: Request, response: Response) {
    try {
      const query = request.query.status;
      const status = query === "GOSTEI" ? Status.GOSTEI : Status.DESEJO_ASSISTIR ;
      const getAllUserSeries = new GetAllUserSeriesUseCase(this.userRepository, this.serieRepository);
      const result = await getAllUserSeries.execute(request.body.userId, status);
      return response.status(200).json(result);
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }
}
