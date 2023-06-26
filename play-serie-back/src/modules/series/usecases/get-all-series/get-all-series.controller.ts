import { Request, Response } from "express";
import { ISerieRepository } from "../../repository/serie.repository";
import { GetallSeriesUseCase } from "./getAllSeries.usecase";

export class GetAllSeriesController {
    constructor(private serieRepository: ISerieRepository){}
    async handler(request: Request, response: Response){
        try{
            const getAllSeriesUseCase = new GetallSeriesUseCase(this.serieRepository);
            const result = await getAllSeriesUseCase.execute();
            return response.status(200).json(result);
        } catch (err: any) {
            return response.status(400).json(err.message);
        }

    }
}
