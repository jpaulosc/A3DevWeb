import { Request, Response } from "express";
import { ISerieRepository } from "../repository/serie.repository";
import { CreateSerieUseCase } from "./create-serie-usecase";

export class CreateSerieController {
  constructor(private serieRepository: ISerieRepository){}
  async handle(request: Request, response: Response) {
    try {
      const image = request.file?.filename || "";
      const createSerieUseCase = new CreateSerieUseCase(this.serieRepository, image);
      const result = await createSerieUseCase.execute(request.body);
      return response.status(201).json(result);
    } catch (err: any) {
      return response.status(400).json(
        err.message
      );
    }
  }
}
