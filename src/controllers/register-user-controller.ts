import { Request, Response } from "express";

const registerUserController = (req: Request, res: Response) => {
    console.log("/register-user working!");
    res.json({ok: true});
}

export default registerUserController;