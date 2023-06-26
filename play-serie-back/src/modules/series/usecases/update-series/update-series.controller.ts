import { Request, Response } from "express";
import { UpdateSeriesUseCase } from "./update-series.usecases";
import { ISerieRepository } from "../../repository/serie.repository";

export class UpdateSeriesController {
    constructor(private serieRepository: ISerieRepository){}
    async handle(request: Request, response: Response) {
        try {
            const image = request.file?.filename || "";
            const {id} = request.params;
            const updateSeriesUseCase = new UpdateSeriesUseCase(this.serieRepository, request.body, id, image);
            const result = await updateSeriesUseCase.execute();
            return response.status(200).json(result);
        } catch (err: any) {
            console.log(err.message);
        }
    }
}
