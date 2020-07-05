import connection from "../routines/connection";

const logsModel = (type: string, payload: any) => {
    let sql: string = "";
    console.log(type);

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

        default: break;
    }

    connection.query(sql);
}

export default logsModel;