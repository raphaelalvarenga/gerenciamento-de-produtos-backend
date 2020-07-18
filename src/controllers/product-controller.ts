import { Request, Response } from "express";
import auth from "../routines/auth";
import RequestInterface from "../interfaces/request-interface";
import ResponseInterface from "../interfaces/response-interface";
import { ProductRequestParamsList, ProductInterface } from "../interfaces/product-interface";
import connection from "../routines/connection";

const productController = async (req: Request, res: Response) => {
    const request: RequestInterface = req.body;
    const params: number = req.body.params.idProduct as number;

    // Delivers this new data to frontend
    let response: ResponseInterface = { success: false, message: "", params: {} };

    // Check the authentication
    response = auth(req.body, response);

    // Is it authenticated?
    if (response.success) {

        let sql = `SELECT * FROM products WHERE idProduct = ${params}`;

        connection.query(sql, (erro, resultProduct, fields) => {
            if (erro) {
                res.json(erro);
            } else {
                const product = (resultProduct as ProductInterface[])[0];

                response = {success: true, message: "", params: product};
                
                // Registering log
                const {idLogin} = request;
                sql = `
                    INSERT INTO logs
                    (idLog, idLogin, action, dateTime)
                    VALUES
                    (
                        default, ?,
                        CONCAT('User ', ?, ' searched one product of id: ', ?),
                        DEFAULT
                    );
                `;
                connection.execute(sql, [idLogin, idLogin, JSON.stringify(params)], (erro, resultAddedUser, fields) => {
                    if (erro) {
                        console.log(erro);
                    } else {
                        res.json(response);
                    }
                });
            }
        });

    } else {
        res.json(response);
    }
        

}

export default productController;