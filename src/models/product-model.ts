import { ProductInterface, ProductRequestParamsList, ProductRequestParamsAdd } from "../interfaces/product-interface";
import asyncConnection from "../routines/async-connection";

export default class ProductModel {
    private sql: string;
    private result: any;

    constructor() {
        this.sql = "";
    }

    async getProducts(params: ProductRequestParamsList) {
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

    async addProduct(params: ProductRequestParamsAdd) {

        // Add the product
        this.sql = `
            INSERT INTO products
            (idProduct, name, description, category, price)
            VALUES
            (DEFAULT, '${params.name}', '${params.description}', '${params.category}', '${params.price}')
        `;

        let conn = await asyncConnection();
        await conn.execute(this.sql);

        // Get its register
        this.sql = `
            SELECT *
            FROM products
            ORDER BY idProduct DESC
            LIMIT 1
        `;

        conn = await asyncConnection();
        this.result = await conn.execute(this.sql);

        return this.result[0]
    }
}