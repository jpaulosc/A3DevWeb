import { Request, Response } from "express";
import { GetAllPlatformsUseCase } from "./get-all-platforms.usecase";
import { IPlatformRepository } from "../../repository/platform.repository";

export class GetAllPlatformsController {
    constructor(private platformRepository: IPlatformRepository){}
    async handle(request: Request, response: Response){
        try {
            const getAllPlatformsUseCase = new GetAllPlatformsUseCase(this.platformRepository);
            const result = await getAllPlatformsUseCase.execute();
            return response.status(200).json(result);
        } catch (err: any) {
            return response.status(400).json(err.message);
        }
    }
}
