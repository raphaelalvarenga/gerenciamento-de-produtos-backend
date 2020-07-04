import { Request, Response} from "express";
import RequestInterface from "../interfaces/request-interface";
import ResponseInterface from "../interfaces/response-interface";
import UserInterface from "../interfaces/user-interface";
import md5 from "md5";
import jwt from "jsonwebtoken";
import connection from "../routines/connection";

const loginController = (req: Request, res: Response) => {

    const request: RequestInterface = req.body;
    let response: ResponseInterface = { success: false, message: "", params: {} };

    // In this point, backend will connect to the database
    let sql: string = `SELECT * FROM users WHERE email = '${request.params.email}'`;

    connection.query(sql, (error, results, fields) => {
        const user = (results as UserInterface[])[0];

        // If no login was found...
        if (!user) {
            response = {...response, message: "There is no register based on these credentials"};
            res.json(response);
            return false;
        }
        
        // If login was found but the password doesn't match...
        if ((request.params as {email: string, password: string}).password !== user.password) {
            response = {...response, message: "Password invalid!"};
            res.json(response);
            return false;
        }

        // If everything is correct...
        const { idLogin, name, email, password } = user;

        // Generating a token based on the idLogin + timestamp of now turned into md5 that expires in 5 minutes
        const payload = md5(`${idLogin}${new Date().getTime().toString()}`);
        const token: string = jwt.sign({payload}, "adopetsChallenge", { expiresIn: 300 });

        // Register a log here
        sql = `
            INSERT INTO logs
            (idLog, idLogin, action, dateTime)
            VALUES
            (default, ${idLogin}, 'Just made a login', DEFAULT);
        `;

        connection.query(sql);

        response = { success: true, message: "", params: { idLogin, token } };

        res.json(response);
    });
    
}

export default loginController;