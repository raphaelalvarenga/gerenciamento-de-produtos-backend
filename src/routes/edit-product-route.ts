import { Router } from "express";
import editProductController from "../controllers/edit-product-controller";

const router = Router();

router.route("/edit-product").post(editProductController);

export default router;