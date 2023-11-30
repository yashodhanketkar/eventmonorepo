import { Router } from "express";
import { EventRouter } from "../routes/event/routes.js";
import { FileRouter } from "../routes/file/routes.js";
import { UserRouter } from "../routes/user/routes.js";

const router = Router();

router.use("/users", UserRouter);
router.use("/events", EventRouter);
router.use("/file", FileRouter);

export { router as MainRouter };
