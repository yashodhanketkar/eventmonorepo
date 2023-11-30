import { Router } from "express";
import { Admin } from "../../middlewares/admin.js";
import { Auth } from "../../middlewares/auth.js";
import { UserController } from "./controller.js";

const userController = new UserController();

const router = Router();

router.get("/", [Auth], userController.me);

router.post("/login", userController.login);
router.post("/register", userController.register);

router.patch("/setadmin/:id", [Auth, Admin], userController.setAdmin);

export { router as UserRouter };
