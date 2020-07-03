import { Request, Response} from "express";
import RequestInterface from "../interfaces/request-interface";
import ResponseInterface from "../interfaces/response-interface";
import UsuarioInterface from "../interfaces/usuario-interface";
import md5 from "md5";

const loginController = (req: Request, res: Response) => {

    const request: RequestInterface = req.body;

    // In this point, backend will connect to the database

    // The code below is a hard code just to simulate what database returns while a connection isn't being used yet
    
    const sql: UsuarioInterface = {
        idLogin: 1,
        nome: "Raphael Alvarenga do Carmo",
        email: "raphaelalvarenga2@gmail.com",
        senha: "aa1bf4646de67fd9086cf6c79007026c"
    }

    const { idLogin, nome, email, senha } = sql;

    // Generating a token as the following: idLogin + timestamp + hashed into MD5
    const now = new Date().getTime();
    const token: string = md5(`${sql.idLogin.toString()}${now.toString()}`);

    // Register a log here

    const response: ResponseInterface = {
        success: true,
        message: "",
        params: { idLogin, token }
    };

    res.json(response);
}

export default loginController;