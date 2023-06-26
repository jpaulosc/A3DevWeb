import { Request, Response } from "express";
import { IUserOnSerieRepository } from "../../repository/userOnSerie.repository";
import { CreateListWishUsecase } from "./create-list-wish.usecase";

export class CreateListWishController {
  constructor(private userOnSerie : IUserOnSerieRepository){}
  async handle(request: Request, response: Response) {
    try {
      const createlistWishUsecase = new CreateListWishUsecase(this.userOnSerie);
      const result = await createlistWishUsecase.execute(request.body);
      return response.status(200).json(result);
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }
}
