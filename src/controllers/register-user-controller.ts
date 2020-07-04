import { Request, Response } from "express";
import UserInterface from "../interfaces/user-interface";
import ResponseInterface from "../interfaces/response-interface";
import auth from "../routines/auth";

const registerUserController = (req: Request, res: Response) => {

    // Delivers this new data to frontend
    let response: ResponseInterface = { success: false, message: "", params: {} };

    // Check the authentication
    response = auth(req.body, response);
    
    // Check if the email already exists in the database

    // If it doesn't exist, create a new register

    // Get the id of the new user in the database
    // const sql: UserInterface = {
    //     idLogin: 2,
    //     name: "John Lennon",
    //     email: "johnlennon@gmail.com",
    //     password: "32a3395d1c1921da25eeaa4c89907c95"
    // }
    
    // const { idLogin, name, email, password } = sql;
    
    // response = {
    //     success: true,
    //     message: "",
    //     params: sql
    // }

    res.json(response);
}

export default registerUserController;