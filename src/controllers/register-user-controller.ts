import { Request, Response } from "express";
import UserInterface from "../interfaces/user-interface";
import ResponseInterface from "../interfaces/response-interface";
import auth from "../routines/auth";

const registerUserController = (req: Request, res: Response) => {

    // Delivers this new data to frontend
    let response: ResponseInterface = { success: false, message: "", params: {} };

    // Check the authentication
    response = auth(req.body, response);

    if (response.success) {
        // Check if the email already exists in the database
        let sql: UserInterface = {idLogin: 0, name: "", email: "", password: ""};

        // If a register was found with the data passed...
        if (sql.idLogin !== 0) {
            response = {...response, success: false, message: "There is already an account registered with this e-mail"};
        } else {

            // Register that new account in the database

            // Get the id of the new user in the database
            sql = {
                idLogin: 2,
                name: "John Lennon",
                email: "johnlennon@gmail.com",
                password: "32a3395d1c1921da25eeaa4c89907c95"
            }
            
            const { idLogin, name, email, password } = sql;
            
            response = { success: true, message: "", params: {idLogin, name, email} }
        }

    }
    
    

    res.json(response);
}

export default registerUserController;