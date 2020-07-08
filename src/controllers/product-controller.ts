import { Request, Response } from "express";
import auth from "../routines/auth";
import logsModel from "../models/logs-model";
import RequestInterface from "../interfaces/request-interface";
import ResponseInterface from "../interfaces/response-interface";
import { ProductRequestParamsList } from "../interfaces/product-interface";
import connection from "../routines/connection";

const productController = async (req: Request, res: Response) => {
    const request: RequestInterface = req.body;
    const params: ProductRequestParamsList = req.body.params;

    // Delivers this new data to frontend
    let response: ResponseInterface = { success: false, message: "", params: {} };

    // Check the authentication
    response = auth(req.body, response);

    // Is it authenticated?
    if (response.success) {

        let sql = "SELECT COUNT(*) as total FROM products";

        connection.query(sql, (erro, resultTotalProdutcs, fields) => {
            if (erro) {
                res.json(erro);
            } else {
                const totalProducts = (resultTotalProdutcs as any)[0].total;

                sql = `
                    SELECT * FROM (
                        SELECT *
                        FROM products
                        WHERE name LIKE '%${params.name}%'
                        AND description LIKE '%${params.description}%'
                        AND category LIKE '%${params.category}%'
                        AND status = 1
                    ) products
                    LIMIT ${params.pagination.initialNumber}, ${params.pagination.finalNumber}
                `;

                connection.query(sql, (erro, resultProdutcts, fields) => {
                    if (erro) {
                        res.json(erro);
                    } else {
                        response = {success: true, message: "", params: {totalProducts, resultProdutcts}};
                        
                        // Registering log
                        const {idLogin} = request;
                        logsModel("listProducts", {idLogin, params});
                
                        res.json(response);
                    }
                })

            }
        });


    } else {
        res.json(response);
    }
        

}

export default productController;