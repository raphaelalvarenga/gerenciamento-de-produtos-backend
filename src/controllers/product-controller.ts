import { Request, Response } from "express";
import auth from "../routines/auth";
import logsModel from "../models/logs-model";
import RequestInterface from "../interfaces/request-interface";

const productController = async (req: Request, res: Response) => {
    res.json({route: "Product"});
}

export default productController;