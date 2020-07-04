import { Request, Response } from "express";
import UserInterface from "../interfaces/user-interface";
import ResponseInterface from "../interfaces/response-interface";
import auth from "../routines/auth";
import connection from "../routines/connection";

const registerUserController = (req: Request, res: Response) => {

    // Delivers this new data to frontend
    let response: ResponseInterface = { success: false, message: "", params: {} };
    let params: {name: string, email: string, password: string} = req.body.params;

    // Check the authentication
    response = auth(req.body, response);

    if (response.success) {
        // Check if the email already exists in the database
        let sql: string = `SELECT * FROM users WHERE email = '${params.email}'`

        connection.query(sql, (selectUserError, selectUserResults, selectUserFields) => {
            if (selectUserError) {
                response = {...response, success: false, message: "An error ocurred. Please try again..."};
            } else {

                // If a register was found with the data passed...
                if ((selectUserResults as UserInterface[]).length > 0) {
                    response = {...response, success: false, message: "There is already an account registered with this e-mail"};
                } else {

                    // Register that new account in the database
                    sql = `
                        INSERT INTO users
                        (idLogin, name, email, password)
                        VALUES
                        (DEFAULT, '${params.name}', '${params.email}', '${params.password}')
                    `;

                    connection.query(sql, (insertUserError, insertUserResult, insertUserFields) => {
                        if (insertUserError) {
                            response = {...response, success: false, message: "An error ocurred. Please try again..."};
                        } else {

                            // Get new user id
                            sql = `SELECT * FROM users WHERE email = ${params.email}`

                            connection.query(sql, (selectNewUserError, selectNewUserResults, selectNewUserFields) => {
                                if (selectNewUserError) {
                                    response = {...response, success: false, message: "An error ocurred. Please try again..."};
                                } else {
                                    const newUser: UserInterface = (selectNewUserResults as UserInterface[])[0];

                                    const { idLogin, name, email, password } = newUser;
                                    
                                    response = { success: true, message: "", params: {idLogin, name, email} }
                                }
                            })
                        }
                    })
                }
            }
            res.json(response);
        })
    }
}

export default registerUserController;