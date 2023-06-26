import { IPlatformRepository } from "../../repository/platform.repository";
import { PlatFormRequest } from "../create-platforms/create-platform.usecase";


export class UpdatePlatformsUseCase {
    constructor(private platformRepository: IPlatformRepository, private image: string){}
    async execute(data: PlatFormRequest){
        const platformExist = await this.platformRepository.findByName(data.name);

        if (!platformExist) {
            throw new Error("Platform does not exist");
        }

        const platformUpdate = await this.platformRepository.update(platformExist, this.image);
        return platformUpdate;

    }
}
