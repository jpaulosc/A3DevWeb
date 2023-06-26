import { prismaClient } from "../../../../infra/database/prismaClient";
import { UserOnSerie } from "../../entities/userOnSerie.entity";
import { IUserOnSerieRepository } from "../userOnSerie.repository";

export class UserOnSeriePrismaRepository implements IUserOnSerieRepository {
  async findUserAndSerie(userId: string, serieId: string): Promise<any> {
    const result = await prismaClient.userOnSeries.findFirst({
      where: {
        serieId,
        AND: {
          userId
        }
      }
    });

    return result;
  }
  async save(userOnSerie: UserOnSerie): Promise<any> {

    const findSerieAndUser = await this.findUserAndSerie(userOnSerie.userId, userOnSerie.serieId);

    if (!findSerieAndUser) {
      const result = await prismaClient.userOnSeries.create({
        data: {
          status: userOnSerie.status,
          serieId: userOnSerie.serieId,
          userId: userOnSerie.userId
        }
      });
      return result;
    }

    throw new Error("Esta Série já está cadastrada para este usuário");
  }

  async deleteSerieList(userOnSerie: UserOnSerie): Promise<void> {
    await prismaClient.userOnSeries.deleteMany({
      where: {
        id: userOnSerie.id
      }
    });
  }

}
