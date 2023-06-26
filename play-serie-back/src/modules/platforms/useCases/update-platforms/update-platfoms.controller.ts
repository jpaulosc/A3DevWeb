import { Request, Response } from "express";
import { UpdatePlatformsUseCase } from "./update-platforms.usecase";
import { IPlatformRepository } from "../../repository/platform.repository";

export class UpdatePlatformsController {
    constructor(private platformRepository: IPlatformRepository) {}
    async handle(request: Request, response: Response) {
        try {
            const image = request.file?.filename || "";
            const updatePlatformsUseCase = new UpdatePlatformsUseCase(this.platformRepository, image);
            const result = await updatePlatformsUseCase.execute(request.body);
            return response.status(200).json(result);
        } catch (err: any) {
            return response.status(400).json(err.message);
        }
    }
}
