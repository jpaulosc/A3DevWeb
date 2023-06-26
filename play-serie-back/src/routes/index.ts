import { Router } from "express";
import { userRouter } from "./user.routes";
import { serieRouter } from "./serie.routes";
import { platformRouter } from "./platforms.routes";

const router = Router();

router.use(userRouter);
router.use(serieRouter);
router.use(platformRouter);

export {router};
