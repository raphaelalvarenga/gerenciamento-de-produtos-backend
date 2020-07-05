import { ProductInterface, ProductRequestParams } from "../interfaces/product-interface";
import asyncConnection from "../routines/async-connection";

export default class ProductModel {
    private sql: string;
    private result: any;

    constructor() {
        this.sql = "";
    }

    async getProducts(params: ProductRequestParams) {
        this.sql = `
            SELECT * FROM (
                SELECT *
                FROM products
                WHERE name LIKE '%${params.name}%'
                AND description LIKE '%${params.description}%'
                AND category LIKE '%${params.category}%'
            ) products
            LIMIT ${params.pagination.initialNumber}, ${params.pagination.finalNumber}
        `;
        
        const conn = await asyncConnection();
        this.result = await conn.execute(this.sql);
        
        return this.result[0];
    }
}