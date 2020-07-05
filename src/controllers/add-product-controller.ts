import { Request, Response } from "express";
import auth from "../routines/auth";
import logsModel from "../models/logs-model";
import RequestInterface from "../interfaces/request-interface";
import ResponseInterface from "../interfaces/response-interface";
import ProductModel from "../models/product-model";
import { ProductRequestParamsAdd, ProductInterface } from "../interfaces/product-interface";

const productController = async (req: Request, res: Response) => {
    const request: RequestInterface = req.body;
    const params: ProductRequestParamsAdd = req.body.params;

    // Delivers this new data to frontend
    let response: ResponseInterface = { success: false, message: "", params: {} };

    // Check the authentication
    response = auth(req.body, response);

    // Is it authenticated?
    if (response.success) {
        const productModel = new ProductModel();

        const sqlResult = await productModel.addProduct(params);

        const newProduct: ProductInterface = sqlResult[0];

        response = {success: true, message: "", params: {newProduct}};

        // Register new log
        const {idLogin} = request;
        logsModel("addProduct", {idLogin, newProduct});

        res.json(response);
    } else {
        res.json(response);
    }
}

export default productController;