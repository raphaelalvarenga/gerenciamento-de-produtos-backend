import { Request, Response } from "express";
import auth from "../routines/auth";
import RequestInterface from "../interfaces/request-interface";
import ResponseInterface from "../interfaces/response-interface";
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
            SET name = ?,
            description = ?,
            category = ?,
            price = ?,
            status = ?
            WHERE idProduct = ?
        `;
        
        connection.execute(sql, [
            params.name,
            params.description,
            params.category,
            params.price,
            params.status,
            params.idProduct
        ], (erro, resultEditProduct, fields) => {
            if (erro) {
                res.json(erro);
            } else {
                sql = `SELECT * FROM products WHERE idProduct = ?`
                connection.execute(sql, [params.idProduct], (erro, resultEditedProduct, fields) => {
                    if (erro) {
                        res.json(erro);
                    } else {
                        const editedProduct: ProductInterface = (resultEditedProduct as any)[0];
                        response = {success: true, message: "", params: {resultEditedProduct}};
                        
                        // Register new log
                        const {idLogin} = request;
                        
                        sql = `
                            INSERT INTO logs
                            (idLog, idLogin, action, dateTime)
                            VALUES
                            (
                                default, ?,
                                CONCAT('User ', ?, ' edited this product: ', ?),
                                DEFAULT
                            );
                        `;
                        connection.execute(sql, [idLogin, idLogin, JSON.stringify(editedProduct.idProduct)], (erro, resultAddedUser, fields) => {});
                    
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