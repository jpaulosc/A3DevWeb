import { Request, Response } from "express";
import { IUserOnSerieRepository } from "../../repository/userOnSerie.repository";
import { DeleteSerieListUsecase } from "./delete-serie-list.usecase";

export class DeleteSerieListController {
  constructor(private userOnSerieRepository: IUserOnSerieRepository){}
  async handle(request: Request, response: Response) {
    try {
      const deleteSerieListUsecase = new DeleteSerieListUsecase(this.userOnSerieRepository);
      await deleteSerieListUsecase.execute(request.body);
      return response.sendStatus(200);
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }
}
