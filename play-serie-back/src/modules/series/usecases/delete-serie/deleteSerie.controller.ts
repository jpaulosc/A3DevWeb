import { Request, Response } from "express";
import { ISerieRepository } from "../../repository/serie.repository";
import { DeleteSerieUseCase } from "./deleteSerie.usecase";

export class DeleteSerieController {
  constructor(private serieRepository: ISerieRepository){}
  async handle(request: Request, response: Response) {
    const {id} = request.params;
    try {
      const deleteSerieUseCase = new DeleteSerieUseCase(this.serieRepository);
      await deleteSerieUseCase.execute(id);
      return response.sendStatus(200);
    } catch (err: any) {
      return response.status(400).json(err.message);
    }
  }
}
