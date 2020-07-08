import { Request, Response } from "express";
import auth from "../routines/auth";
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
                        WHERE name LIKE (SELECT CONCAT('%', ?, "%'))
                        AND description LIKE (SELECT CONCAT('%', ?, "%'))
                        AND category LIKE (SELECT CONCAT('%', ?, "%'))
                        AND status = 1
                    ) products
                    LIMIT ?, ?
                `;

                connection.execute(sql, [
                    params.name,
                    params.description,
                    params.category,
                    params.pagination.initialNumber,
                    params.pagination.finalNumber
                ], (erro, resultProdutcts, fields) => {
                    if (erro) {
                        res.json(erro);
                    } else {
                        response = {success: true, message: "", params: {totalProducts, resultProdutcts}};
                        
                        // Registering log
                        const {idLogin} = request;
                        sql = `
                            INSERT INTO logs
                            (idLog, idLogin, action, dateTime)
                            VALUES
                            (
                                default, ?,
                                CONCAT('User ', ?, ' searched products with the following params: ', ?),
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
                })

            }
        });


    } else {
        res.json(response);
    }
        

}

export default productController;