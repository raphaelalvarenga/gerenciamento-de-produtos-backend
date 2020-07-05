import asyncMysql from "mysql2/promise.js";

const asyncConnection = async () => {
    return await asyncMysql.createConnection({
        host: process.env.HOST,
        user: process.env.DBUSER,
        database: process.env.DATABASE,
        password: process.env.PASSWORD
    });
};

export default asyncConnection;