import { Request, Response } from "express";
import auth from "../routines/auth";
import logsModel from "../models/logs-model";
import RequestInterface from "../interfaces/request-interface";
import ResponseInterface from "../interfaces/response-interface";
import ProductModel from "../models/product-model";
import { ProductRequestParamsEdit, ProductInterface } from "../interfaces/product-interface";
import connection from "../routines/connection";

const editController = async (req: Request, res: Response) => {
    const request: RequestInterface = req.body;
    const params: ProductRequestParamsEdit = req.body.params;

    // Delivers this new data to frontend
    let response: ResponseInterface = { success: false, message: "", params: {} };

    // Check the authentication
    response = auth(req.body, response);

    // Is it authenticated?
    if (response.success) {
        
        let sql = `
            UPDATE products
            SET name = '${params.name}',
            description = '${params.description}',
            category = '${params.category}',
            price = '${params.price}'
            WHERE idProduct = ${params.idProduct}
        `;
        
        connection.query(sql, (erro, resultEditProduct, fields) => {
            if (erro) {
                res.json(erro);
            } else {
                connection.query(sql, (erro, resultEditedProduct, fields) => {
                    if (erro) {
                        res.json(erro);
                    } else {
                        const editedProduct: ProductInterface = (resultEditedProduct as any)[0];
                        response = {success: true, message: "", params: {resultEditedProduct}};
                        
                        // Register new log
                        const {idLogin} = request;
                        logsModel("editProduct", {idLogin, editedProduct});
                        res.json(response);
                    }
                });
            }
        });
    } else {
        res.json(response);
    }
}

export default editController;