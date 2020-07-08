import { Request, Response } from "express";
import auth from "../routines/auth";
import logsModel from "../models/logs-model";
import RequestInterface from "../interfaces/request-interface";
import ResponseInterface from "../interfaces/response-interface";
import { ProductRequestParamsAdd, ProductInterface } from "../interfaces/product-interface";
import connection from "../routines/connection";

const productController = async (req: Request, res: Response) => {
    const request: RequestInterface = req.body;
    const params: ProductRequestParamsAdd = req.body.params;

    // Delivers this new data to frontend
    let response: ResponseInterface = { success: false, message: "", params: {} };

    // Check the authentication
    response = auth(req.body, response);

    // Is it authenticated?
    if (response.success) {

        let sql = `
            INSERT INTO products
            (idProduct, name, description, category, price)
            VALUES
            (DEFAULT, ?, ?, ?, ?)
        `;

        connection.execute(sql, [params.name, params.description, params.category, params.price], (erro, resultAddNewProduto, fields) => {
            if (erro) {
                res.json(erro);
            } else {

                sql = `
                    SELECT *
                    FROM products
                    ORDER BY idProduct DESC
                    LIMIT 1
                `;

                connection.query(sql, (erro, resultNewProduto, fields) => {

                    if (erro) {
                        res.json(erro);
                    } else {
                        const newProduct: ProductInterface = (resultNewProduto as any)[0];
                        response = {success: true, message: "", params: {newProduct}};
                        
                        // Register new log
                        const {idLogin} = request;
                        logsModel("addProduct", {idLogin, newProduct});
                        
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