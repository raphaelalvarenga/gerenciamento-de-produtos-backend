import { Request, Response } from "express";
import auth from "../routines/auth";
import logsModel from "../models/logs-model";
import RequestInterface from "../interfaces/request-interface";
import ResponseInterface from "../interfaces/response-interface";
import ProductModel from "../models/product-model";
import { ProductRequestParamsList } from "../interfaces/product-interface";

const productController = async (req: Request, res: Response) => {
    const request: RequestInterface = req.body;
    const params: ProductRequestParamsList = req.body.params;

    // Delivers this new data to frontend
    let response: ResponseInterface = { success: false, message: "", params: {} };

    // Check the authentication
    response = auth(req.body, response);

    // Is it authenticated?
    if (response.success) {
        const productModel = new ProductModel();

        let totalProducts = await productModel.countProducts();
        totalProducts = totalProducts[0].total;
        console.log(totalProducts);

        const products = await productModel.getProducts(params);

        response = {success: true, message: "", params: {totalProducts, products}};

        // Registering log
        const {idLogin} = request;
        logsModel("listProducts", {idLogin, params});

        res.json(response);

    } else {
        res.json(response);
    }
        

}

export default productController;