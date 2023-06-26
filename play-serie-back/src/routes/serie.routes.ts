import { Router } from "express";
import { createSerieController } from "../modules/series/usecases";
import multer from "multer";
import configMulter from "../config/upload.config";
import { updateSerieController } from "../modules/series/usecases/update-series";
import { getAllSeriesControler } from "../modules/series/usecases/get-all-series";
import { getSerieController } from "../modules/series/usecases/get-serie";
import { createListWishController } from "../modules/series/usecases/create-list-wish";
import { deleteSerieListController } from "../modules/series/usecases/delete-serie-list";
import { deleteSerieController } from "../modules/series/usecases/delete-serie";

const serieRouter = Router();

const upload = multer(configMulter);

serieRouter.post("/serie",upload.single("image"), async (request, response) => {
  await createSerieController.handle(request, response);
});

serieRouter.delete("/serie/list-status", async (request, response) => {
  await deleteSerieListController.handle(request, response);
});

serieRouter.delete("/serie/:id", async (request, response) => {
  await deleteSerieController.handle(request, response);
});

serieRouter.get("/serie", async (request, response) => {
  await getAllSeriesControler.handler(request, response);
});

serieRouter.get("/serie/edit/:id", async (request, response) => {
  await getSerieController.handle(request, response);
});

serieRouter.get("/serie/:id", async (request, response) => {
  await getSerieController.handle(request, response);
});

serieRouter.patch("/serie/edit/:id", upload.single("image"), async (request, response) => {
  await updateSerieController.handle(request, response);
});

serieRouter.post("/status", async (request, response) => {
  await createListWishController.handle(request, response);
});




export {serieRouter};
