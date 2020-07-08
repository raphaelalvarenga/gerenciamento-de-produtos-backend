import { Request, Response } from "express";
import auth from "../routines/auth";
import logsModel from "../models/logs-model";
import RequestInterface from "../interfaces/request-interface";
import ResponseInterface from "../interfaces/response-interface";
import connection from "../routines/connection";

const deleteProductController = async (req: Request, res: Response) => {
    const request: RequestInterface = req.body;

    // Delivers this new data to frontend
    let response: ResponseInterface = { success: false, message: "", params: {} };

    // Check the authentication
    response = auth(request, response);

    // Is it authenticated?
    if (response.success) {

        let sql = `
            UPDATE products
            SET status = 0
            WHERE idProduct = ?
        `;
        
        connection.execute(sql, [request.params.idProduct], (erro, resultDeleteProduct, fields) => {
            if (erro) {
                res.json(erro);
            } else {
                response = {success: true, message: "", params: {}};

                // Register new log
                const {idLogin} = request;
                logsModel("deleteProduct", {idLogin, idDeletedProduct: request.params.idProduct});

                res.json(response);
            }
        })
    } else {
        res.json(response);
    }
}

export default deleteProductController;