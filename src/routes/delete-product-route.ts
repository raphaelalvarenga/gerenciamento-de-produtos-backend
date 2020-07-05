import { Router } from "express";
import deleteProductController from "../controllers/delete-product-controller";

const router = Router();

router.route("/delete-product").post(deleteProductController);

export default router;