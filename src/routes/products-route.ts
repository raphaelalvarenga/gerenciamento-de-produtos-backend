import { Router } from "express";
import productController from "../controllers/products-controller";

const router = Router();

router.route("/").post(productController);

export default router;