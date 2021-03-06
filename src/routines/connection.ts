import mysql from "mysql2";

const connection = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DBUSER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DBPORT ? parseInt(process.env.DBPORT) : 0,
    waitForConnections: true,
    connectionLimit: 20
})

export default connection;