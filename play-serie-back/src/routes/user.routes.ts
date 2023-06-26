import { Router } from "express";
import { createUserController } from "../modules/user/usecases/create-user";
import { authenticateUserController } from "../modules/user/usecases/authenticate-user";
import { getAllUserSeriesController } from "../modules/user/usecases/get-all-user-series";
import { getAllUsersController } from "../modules/user/usecases/get-all-users";

const userRouter = Router();

userRouter.get("/users", async (request, response) => {
  await getAllUsersController.handle(request, response);
});

userRouter.post("/users", async (request, response) => {
  await createUserController.handle(request, response);
});

userRouter.post("/login", async (request, response) => {
  await authenticateUserController.handle(request, response);
});

userRouter.post("/user/series/", async (request, response) => {
  await getAllUserSeriesController.handle(request, response);
});

export {userRouter};
