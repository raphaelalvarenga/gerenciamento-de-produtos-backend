import { Router } from "express";
import logoutControlller from "../controllers/logout-controller";

const router = Router();

router.route("/logout").post(logoutControlller);

export default router;