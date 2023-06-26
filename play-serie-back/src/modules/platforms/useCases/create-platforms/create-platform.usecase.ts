import { Platform } from "../../entity/platform.entity";
import { IPlatformRepository } from "../../repository/platform.repository";

export interface PlatFormRequest {
  name: string
  image: string | null
}

export class CreatePlatformUseCase {
    constructor(private platformRepository: IPlatformRepository, private image: string){}
    async execute(data: PlatFormRequest) {
        const platformExists = await this.platformRepository.findByName(data.name);

        if (platformExists) {
            throw new Error ("Platform is already exists");
        }

        const platfrom = new Platform(data);
        const result = await this.platformRepository.save(platfrom, this.image);
        return result;
    }
}
