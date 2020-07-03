import { Request, Response } from "express";
import UserInterface from "../interfaces/user-interface";
import ResponseInterface from "../interfaces/response-interface";

const registerUserController = (req: Request, res: Response) => {

    // Check if the email already exists in the database

    // If it doesn't exist, create a new register

    // Get the id of the new user in the database
    const sql: UserInterface = {
        idLogin: 2,
        name: "John Lennon",
        email: "johnlennon@gmail.com",
        password: "32a3395d1c1921da25eeaa4c89907c95"
    }
    
    const { idLogin, name, email, password } = sql;
    
    // Delivers this new data to frontend
    const response: ResponseInterface = {
        success: true,
        message: "",
        params: sql
    }

    res.json(response);
}

export default registerUserController;