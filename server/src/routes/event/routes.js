import { Router } from "express";
import { EventController } from "./controller.js";

const eventController = new EventController();
const router = Router();

router.get("/", eventController.list);
router.get("/:id", eventController.read);

router.post("/", eventController.create);

router.patch("/:id", eventController.update);

router.delete("/:id", eventController.delete);

export { router as EventRouter };
