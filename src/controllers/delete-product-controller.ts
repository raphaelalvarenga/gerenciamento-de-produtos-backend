import { Request, Response } from "express";
import auth from "../routines/auth";
import logsModel from "../models/logs-model";
import RequestInterface from "../interfaces/request-interface";
import ResponseInterface from "../interfaces/response-interface";
import ProductModel from "../models/product-model";

const deleteProductController = async (req: Request, res: Response) => {
    const request: RequestInterface = req.body;

    // Delivers this new data to frontend
    let response: ResponseInterface = { success: false, message: "", params: {} };

    // Check the authentication
    response = auth(request, response);

    // Is it authenticated?
    if (response.success) {
        const productModel = new ProductModel();

        await productModel.deleteProduct(request.params.idProduct);

        response = {success: true, message: "", params: {}};

        // Register new log
        const {idLogin} = request;
        logsModel("deleteProduct", {idLogin, idDeletedProduct: request.params.idProduct});

        res.json(response);
    } else {
        res.json(response);
    }
}

export default deleteProductController;