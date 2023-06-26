import { prismaClient } from "../../../../infra/database/prismaClient";
import { Platform } from "../../entity/platform.entity";
import { IPlatformRepository } from "../platform.repository";

export class PlatformRepositoryPrisma implements IPlatformRepository {
    async getAll(): Promise<Platform[]> {
        const result = await prismaClient.platform.findMany();
        return result;
    }
    async save(platform: Platform, image: string): Promise<Platform> {
        const result = await prismaClient.platform.create({
            data: {
                name: platform.name,
                image: image
            }
        });
        return result;
    }

    findByName(name: string): Promise<Platform | null> {
        const result = prismaClient.platform.findFirst({
            where: {
                name
            }
        });

        return result;
    }

    update(platform: Platform, image: string): Promise<Platform> {
        const result = prismaClient.platform.update({
            where: {
                id: platform.id
            },
            data: {
                image: image,
                name: platform.name
            }
        });

        return result;
    }
}
