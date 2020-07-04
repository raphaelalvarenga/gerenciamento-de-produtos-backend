import mysql from "mysql2";

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DBUSER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD
})

export default connection;