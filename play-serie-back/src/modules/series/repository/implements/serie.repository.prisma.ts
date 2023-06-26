import { prismaClient } from "../../../../infra/database/prismaClient";
import { Series } from "../../entities/series.entity";
import { SerieRequest } from "../../usecases/update-series/update-series.usecases";
import { ISerieRepository } from "../serie.repository";

export class SerieRepositoryPrisma implements ISerieRepository {
  async save(serie: Series, image: string ): Promise<any> {
    const platformExists = await prismaClient.platform.findFirst({
      where: {
        id: serie.platform
      }
    });

    if (platformExists) {
      const result = await prismaClient.series.create({
        data: {
          description: serie.description,
          image: image,
          name: serie.name,
          platforms: {
            connect: {
              id: platformExists.id
            }
          }
        }
      });
      return result;
    } else {
      const result = await prismaClient.series.create({
        data: {
          description: serie.description,
          image: image,
          name: serie.name,
          platforms: {
            create: {
              name: serie.platform,
            }
          }
        }
      });
      return result;
    }
  }

  getAll(): Promise<any[]> {
    const result = prismaClient.series.findMany({
      include: {
        platforms: true
      },
    });
    return result;
  }

  async updatedSerie(serie: SerieRequest, id: string, image: string): Promise<any> {
    const result = await prismaClient.series.update({
      where: {
        id
      },
      data: {
        name: serie.name,
        description: serie.description,
        platforms: {
          set: [{ id: serie.platformId }]
        },
        ...(image && { image }),
      },
      select: {
        name: true,
        description: true,
        image: true,
        platforms: true
      }
    });

    return result;
  }

  async findById(id: string): Promise<any> {
    const result = await prismaClient.series.findUnique({
      where: {
        id,
      },
      include: {
        platforms: true
      }
    });

    return result;
  }

  async deleteSerie(serieId: string): Promise<void> {
    await prismaClient.series.deleteMany({
      where: {
        id: serieId
      }
    });
  }

}
