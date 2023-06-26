import { Request, Response } from "express";
import { IPlatformRepository } from "../../repository/platform.repository";
import { CreatePlatformUseCase } from "./create-platform.usecase";

export class CreatePlatformController {
    constructor(private platformRepository: IPlatformRepository){}
    async handle(request: Request, response: Response){
        try {
            const image= request.file?.filename || "";
            const createPlatformUseCase = new CreatePlatformUseCase(this.platformRepository, image);
            const result = await createPlatformUseCase.execute(request.body);
            return response.status(201).json(result);
        } catch (err: any) {
            return response.status(400).json(err.message);
        }

    }
}
