import { PlatformRepositoryPrisma } from "../../repository/implements/platform.prisma.repository";
import { UpdatePlatformsController } from "./update-platfoms.controller";

const platformRepository = new PlatformRepositoryPrisma();

const updatePlatformsController = new UpdatePlatformsController(platformRepository);

export {updatePlatformsController};
