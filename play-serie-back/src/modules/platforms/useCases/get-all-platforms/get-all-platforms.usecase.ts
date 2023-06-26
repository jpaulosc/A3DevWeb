import { IPlatformRepository } from "../../repository/platform.repository";

export class GetAllPlatformsUseCase {
    constructor(private platformRepository: IPlatformRepository){}
    execute() {
        const result = this.platformRepository.getAll();
        return result;
    }
}
