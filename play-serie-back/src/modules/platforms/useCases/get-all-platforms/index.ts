import { PlatformRepositoryPrisma } from "../../repository/implements/platform.prisma.repository";
import { GetAllPlatformsController } from "./get-all-platforms.controller";

const platformRepository = new PlatformRepositoryPrisma();
const getAllPlatformsController = new GetAllPlatformsController(platformRepository);

export {getAllPlatformsController};
