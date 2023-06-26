import { UserOnSeriePrismaRepository } from "../../repository/implements/userOnSerie.repository.prisma";
import { DeleteSerieListController } from "./delete-serie-list-controller";

const userOnSerieRepository = new UserOnSeriePrismaRepository();

const deleteSerieListController = new DeleteSerieListController(userOnSerieRepository);
export {deleteSerieListController};
