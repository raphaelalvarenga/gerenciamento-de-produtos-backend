import ProductInterface from "../interfaces/product-interface";
import asyncConnection from "../routines/async-connection";

export default class ProductModel {
    private sql: string;
    private result: any;

    constructor() {
        this.sql = "";
    }

    getProducts() {
        
    }
}