import { Request, Response } from "express";
import RequestInterface from "../interfaces/request-interface";
import ResponseInterface from "../interfaces/response-interface";

const logout = (req: Request, res: Response) => {
    const response: ResponseInterface = {success: true, message: "", params: {token: ""}};

    res.json(response);
}

export default logout;