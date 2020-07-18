import { Request, Response } from "express";
import UserInterface from "../interfaces/user-interface";
import ResponseInterface from "../interfaces/response-interface";
import auth from "../routines/auth";
import connection from "../routines/connection";
import RequestInterface from "../interfaces/request-interface";

const registerUserController = async (req: Request, res: Response) => {

    const request: RequestInterface = req.body;
    
    // Delivers this new data to frontend
    let response: ResponseInterface = { success: false, message: "", params: {} };

    // This is just to help with intellisense
    let params: {name: string, email: string, password: string} = req.body.params;

    // Check the authentication
    response = auth(req.body, response);

    // Is it authenticated?
    if (response.success) {

        let sql = `SELECT * FROM users WHERE email = ?`;

        connection.execute(sql, [params.email], (erro, resultAddUser, fields) => {
            if (erro) {
                res.json(erro);
            } else {
                // If it does exist...
                if ((resultAddUser as UserInterface[]).length > 0) {
                    response = {...response, success: false, message: "There is already an account registered with this e-mail"};
                    res.json(response);
                    return false;
                }

                // If it doesn't exist, add him/her
                sql = `
                    INSERT INTO users
                    (idLogin, name, email, password)
                    VALUES
                    (DEFAULT, ?, ?, ?)
                `;

                connection.execute(sql, [params.name, params.email, params.password], (erro, resultAddUser, fields) => {
                    if (erro) {
                        res.json(erro);
                    } else {
                        sql = `SELECT * FROM users WHERE email = ?`;

                        connection.execute(sql, [params.email], (erro, resultAddedUser, fields) => {
                            if (erro) {
                                res.json(erro);
                            } else {
                                const newUser: UserInterface[] = resultAddedUser as UserInterface[];
                                // If user has been added...
                                if (newUser.length > 0) {
                                    const { idLogin, name, email, password } = newUser[0];

                                    sql = `
                                        INSERT INTO logs
                                        (idLog, idLogin, action, dateTime)
                                        VALUES
                                        (default, ?, CONCAT('User ', ?, ' registered a new user: ', ?), DEFAULT);
                                    `;

                                    connection.execute(sql, [request.idLogin, request.idLogin, idLogin], (erro, resultAddedUser, fields) => {
                                        if (erro) {
                                            console.log(erro);
                                        }
                                        response = { success: true, message: "", params: {idLogin, name, email} }
                                        res.json(response);
                                    });
                                }
                            }
                        })
                    }
                })
            }
        });
    } else {
        res.json(response);
    }
}

export default registerUserController;