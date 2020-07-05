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
            console.log("teste");
            sql = `
                INSERT INTO logs
                (idLog, idLogin, action, dateTime)
                VALUES
                (
                    default, ${payload.idLogin},
                    'User ${payload.idLogin} added this project: ${JSON.stringify(payload.newProduct)}',
                    DEFAULT
                );
            `;
            console.log(sql);
        break;

        default: break;
    }

    connection.query(sql);
}

export default logsModel;