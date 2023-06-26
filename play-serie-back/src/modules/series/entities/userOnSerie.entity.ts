import {randomUUID} from "crypto";
import { Status } from "../usecases/create-list-wish/create-list-wish.usecase";
interface IUserOnSerieProps {
  status?: Status
  userId: string
  serieId: string
}
export class UserOnSerie {
  id: string;
  status?: Status;
  userId: string;
  serieId: string;
  constructor(data: IUserOnSerieProps) {

    if (!data.serieId) {
      throw new Error("O Id da série é obrigatório");
    }

    if (!data.userId) {
      throw new Error("O Id do usuário é obrigatório");
    }

    this.id = randomUUID();
    this.status = data.status;
    this.serieId = data.serieId,
    this.userId = data.userId;
  }
}
