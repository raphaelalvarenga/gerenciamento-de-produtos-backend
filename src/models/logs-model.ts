import connection from "../routines/connection";

const logsModel = (type: string, payload: any) => {
    let sql: string = "";

    switch (type) {
        case "log":
            sql = `
                INSERT INTO logs
                (idLog, idLogin, action, dateTime)
                VALUES
                (default, ?, 'Just made a login', DEFAULT);
            `;
            connection.execute(sql, [payload.idLogin], (erro, resultAddedUser, fields) => {});
        break;

        case "addUser":

            const {idLogin: newLogin, name, email} = payload.newUser;
            console.log(payload.idLogin, payload.idLogin, newLogin);
            sql = `
                INSERT INTO logs
                (idLog, idLogin, action, dateTime)
                VALUES
                (default, ?, 'User ? registered a new user: ?', DEFAULT);
            `;
            connection.execute(sql, [payload.idLogin, payload.idLogin, newLogin], (erro, resultAddedUser, fields) => {});
        break;

        case "listProducts":
            sql = `
                INSERT INTO logs
                (idLog, idLogin, action, dateTime)
                VALUES
                (
                    default, ?,
                    'User ? searched products with the following params: ?',
                    DEFAULT
                );
            `;
            connection.execute(sql, [payload.idLogin, payload.idLogin, JSON.stringify(payload.params)], (erro, resultAddedUser, fields) => {});
        break;

        case "addProduct":
            sql = `
                INSERT INTO logs
                (idLog, idLogin, action, dateTime)
                VALUES
                (
                    default, ?,
                    'User ? added this product: ?',
                    DEFAULT
                );
            `;
            connection.execute(sql, [payload.idLogin, payload.idLogin, JSON.stringify(payload.newProduct)], (erro, resultAddedUser, fields) => {});
        break;

        case "editProduct":
            sql = `
                INSERT INTO logs
                (idLog, idLogin, action, dateTime)
                VALUES
                (
                    default, ?,
                    'User ? edit this product: ?',
                    DEFAULT
                );
            `;
            connection.execute(sql, [payload.idLogin, payload.idLogin, JSON.stringify(payload.editedProduct.idProduct)], (erro, resultAddedUser, fields) => {});
        break;

        case "deleteProduct":
            sql = `
                INSERT INTO logs
                (idLog, idLogin, action, dateTime)
                VALUES
                (
                    default, ?,
                    'User ? deleted this product: ?',
                    DEFAULT
                );
            `;
            connection.execute(sql, [payload.idLogin, payload.idLogin, JSON.stringify(payload.idDeletedProduct)], (erro, resultAddedUser, fields) => {});
        break;

        default: break;
    }
}

export default logsModel;