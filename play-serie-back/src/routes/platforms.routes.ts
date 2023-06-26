import { Router } from "express";
import { getAllPlatformsController } from "../modules/platforms/useCases/get-all-platforms";
import { createPlatformController } from "../modules/platforms/useCases/create-platforms";
import multer from "multer";
import configMulter from "../config/upload.config";
import { updatePlatformsController } from "../modules/platforms/useCases/update-platforms";

const platformRouter = Router();

const upload = multer(configMulter);

platformRouter.get("/platforms", async (request, response) => {
    await getAllPlatformsController.handle(request, response);
});

platformRouter.post("/platforms", upload.single("image"), async (request, response) => {
    await createPlatformController.handle(request, response);
});

platformRouter.put("/platforms", upload.single("image"), async (request, response) => {
    await updatePlatformsController.handle(request, response);
});

export {platformRouter};
