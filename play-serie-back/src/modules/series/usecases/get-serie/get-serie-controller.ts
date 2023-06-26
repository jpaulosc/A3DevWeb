import { Request, Response } from "express";
import { ISerieRepository } from "../../repository/serie.repository";
import { GetSerieUseCase } from "./get-serie.usecase";

export class GetSerieController {
    constructor(private serieRepository: ISerieRepository){}
    async handle(request: Request, response: Response) {
        try {
            const {id} = request.params;
            const getSerieUseCase = new GetSerieUseCase(this.serieRepository, id);
            const result = await getSerieUseCase.execute();
            return response.status(200).json(result);
        } catch (err: any) {
            console.log(err.message);
        }
    }
}
