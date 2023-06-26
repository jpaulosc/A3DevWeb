import { PlatformRepositoryPrisma } from "../../repository/implements/platform.prisma.repository";
import { CreatePlatformController } from "./create-platform.controller";

const platformRepository = new PlatformRepositoryPrisma();

const createPlatformController = new CreatePlatformController(platformRepository);

export {createPlatformController};
