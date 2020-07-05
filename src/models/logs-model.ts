import connection from "../routines/connection";

const logsModel = (type: string, payload: any) => {
    let sql: string = "";

    switch (type) {
        case "log":
            sql = `
                INSERT INTO logs
                (idLog, idLogin, action, dateTime)
                VALUES
                (default, ${payload.idLogin}, 'Just made a login', DEFAULT);
            `;
        break;

        case "addUser":
            const {idLogin: newLogin, name, email} = payload.newUser;

            sql = `
                INSERT INTO logs
                (idLog, idLogin, action, dateTime)
                VALUES
                (default, ${payload.idLogin}, 'User ${payload.idLogin} registered a new user: ${newLogin}', DEFAULT);
            `;
        break;

        case "listProducts":
            sql = `
                INSERT INTO logs
                (idLog, idLogin, action, dateTime)
                VALUES
                (
                    default, ${payload.idLogin},
                    'User ${payload.idLogin} searched products with the following params: ${JSON.stringify(payload.params)}',
                    DEFAULT
                );
            `;
        break;

        case "addProduct":
            sql = `
                INSERT INTO logs
                (idLog, idLogin, action, dateTime)
                VALUES
                (
                    default, ${payload.idLogin},
                    'User ${payload.idLogin} added this product: ${JSON.stringify(payload.newProduct)}',
                    DEFAULT
                );
            `;
        break;

        case "editProduct":
            sql = `
                INSERT INTO logs
                (idLog, idLogin, action, dateTime)
                VALUES
                (
                    default, ${payload.idLogin},
                    'User ${payload.idLogin} edit this product: ${JSON.stringify(payload.editedProduct)}',
                    DEFAULT
                );
            `;
        break;

        default: break;
    }

    connection.query(sql);
}

export default logsModel;