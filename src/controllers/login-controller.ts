import { Request, Response} from "express";

const loginController = (req: Request, res: Response) => {
    console.log(req.body);
    res.json({route: "login"});
}

export default loginController;