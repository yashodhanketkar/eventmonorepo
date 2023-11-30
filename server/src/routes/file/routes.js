import { Router } from "express";
import { Admin } from "../../middlewares/admin.js";
import { Auth } from "../../middlewares/auth.js";
import { store, upload } from "../../middlewares/file.js";
import { FileController } from "./controller.js";

const fileController = new FileController();

const router = Router();

router.post(
  "/upload",
  [Auth, Admin, upload.single("file")],
  fileController.upload
);
router.post(
  "/store",
  [Auth, Admin, store.single("file")],
  fileController.store
);

export { router as FileRouter };
