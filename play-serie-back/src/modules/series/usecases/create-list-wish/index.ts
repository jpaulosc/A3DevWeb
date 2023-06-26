import { UserOnSeriePrismaRepository } from "../../repository/implements/userOnSerie.repository.prisma";
import { CreateListWishController } from "./create-list-wish.controller";

const createListWishRepositoryPrisma = new UserOnSeriePrismaRepository();
const createListWishController = new CreateListWishController(createListWishRepositoryPrisma);

export {createListWishController};
