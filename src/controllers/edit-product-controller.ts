import { Request, Response } from "express";
import auth from "../routines/auth";
import logsModel from "../models/logs-model";
import RequestInterface from "../interfaces/request-interface";
import ResponseInterface from "../interfaces/response-interface";
import ProductModel from "../models/product-model";
import { ProductRequestParamsEdit, ProductInterface } from "../interfaces/product-interface";

const editController = async (req: Request, res: Response) => {
    const request: RequestInterface = req.body;
    const params: ProductRequestParamsEdit = req.body.params;

    // Delivers this new data to frontend
    let response: ResponseInterface = { success: false, message: "", params: {} };

    // Check the authentication
    response = auth(req.body, response);

    // Is it authenticated?
    if (response.success) {
        const productModel = new ProductModel();

        const sqlResult = await productModel.editProduct(params);

        const editedProduct: ProductInterface = sqlResult[0];

        response = {success: true, message: "", params: {editedProduct}};

        // Register new log
        const {idLogin} = request;
        logsModel("editProduct", {idLogin, editedProduct});

        res.json(response);
    } else {
        res.json(response);
    }
}

export default editController;