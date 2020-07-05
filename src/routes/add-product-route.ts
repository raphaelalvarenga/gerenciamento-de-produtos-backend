import { Router } from "express";
import addProductController from "../controllers/add-product-controller";

const router = Router();

router.route("/add-product").post(addProductController);

export default router;