import { Router } from "express";
import productController from "../controllers/product-controller";

const router = Router();

router.route("/").post(productController);

export default router;