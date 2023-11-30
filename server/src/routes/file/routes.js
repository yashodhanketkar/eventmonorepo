import { Router } from "express";
import { store, upload } from "../../middlewares/file.js";
import { FileController } from "./controller.js";

const fileController = new FileController();

const router = Router();

router.post("/upload", upload.single("file"), fileController.upload);
router.post("/store", store.single("file"), fileController.store);

export { router as FileRouter };
