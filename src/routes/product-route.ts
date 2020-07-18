import { Router } from "express";
import productController from "../controllers/product-controller";

const router = Router();

router.route("/product").post(productController);

export default router;