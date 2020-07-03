import { Router } from "express";
import registerUserController from "../controllers/register-user-controller";

const router = Router();

router.route("/register-user").post(registerUserController);

export default router;