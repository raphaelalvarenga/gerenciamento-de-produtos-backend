import Pagination from "./pagination-interface";

export interface ProductInterface {
    idProduct: number;
    name: string;
    description: string;
    category: string;
    price: string;
    storage: number;
}

export interface ProductRequestParams {
    name: string;
    description: string;
    category: string;
    pagination: Pagination;
}