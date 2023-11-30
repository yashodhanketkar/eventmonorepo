import { Router } from "express";
import { Admin } from "../../middlewares/admin.js";
import { Auth } from "../../middlewares/auth.js";
import { EventController } from "./controller.js";

const eventController = new EventController();
const router = Router();

router.get("/", eventController.list);
router.get("/:id", eventController.read);

router.post("/", [Auth, Admin], eventController.create);

router.patch("/:id", [Auth, Admin], eventController.update);

router.delete("/:id", [Auth, Admin], eventController.delete);

export { router as EventRouter };
