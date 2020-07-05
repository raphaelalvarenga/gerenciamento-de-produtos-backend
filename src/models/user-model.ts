import asyncConnection from "../routines/async-connection";
import UserInterface from "../interfaces/user-interface";

export default class UserModel {
    private sql: string;
    private result: any;

    constructor() {
        this.sql = "";
    }

    async getUserByEmail(email: string): Promise<any[]> {
        this.sql = `SELECT * FROM users WHERE email = '${email}'`;

        const conn = await asyncConnection();

        this.result = await conn.execute(this.sql);
        
        return this.result[0];
    }

    async addUser(name: string, email: string, password: string): Promise<UserInterface[]> {
        this.sql = `
            INSERT INTO users
            (idLogin, name, email, password)
            VALUES
            (DEFAULT, '${name}', '${email}', '${password}')
        `;

        const conn = await asyncConnection();
        await conn.execute(this.sql);

        return await this.getUserByEmail(email);
    }

}