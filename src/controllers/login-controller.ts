import { Request, Response} from "express";
import RequestInterface from "../interfaces/request-interface";
import ResponseInterface from "../interfaces/response-interface";
import UserInterface from "../interfaces/user-interface";
import md5 from "md5";
import jwt from "jsonwebtoken";

const loginController = (req: Request, res: Response) => {

    const request: RequestInterface = req.body;

    // In this point, backend will connect to the database

    // The code below is a hard code just to simulate what database returns while a connection isn't being used yet
    
    const sql: UserInterface = {
        idLogin: 1,
        name: "Raphael Alvarenga do Carmo",
        email: "raphaelalvarenga2@gmail.com",
        password: "aa1bf4646de67fd9086cf6c79007026c"
    }

    const { idLogin, name, email, password } = sql;

    // Generating a token based on the idLogin + timestamp of now turned into md5 that expires in 5 minutes
    const payload = md5(`${idLogin}${new Date().getTime().toString()}`);
    const token: string = jwt.sign({payload}, "adopetsChallenge", { expiresIn: 300 });

    // Register a log here

    const response: ResponseInterface = {
        success: true,
        message: "",
        params: { idLogin, token }
    };

    res.json(response);
}

export default loginController;