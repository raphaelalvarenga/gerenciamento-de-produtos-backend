import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import loginRoute from "../routes/login-route";
import registerUserRoute from "../routes/register-user-route";
import logoutRoute from "../routes/logout-route";
import productRoute from "../routes/product-route";
import addProductRoute from "../routes/add-product-route";

// An instance of this class represents the server
export default class App {

    // This variable will do Express' job
    private server: Application;

    // When the server starts, it needs to set the port, cors, routes, etc...
    constructor(private port?: number | string) {
        this.server = express();
        this.settings();
        this.routes();
    }

    // This settings is called to set things the server will need to work
    public settings() {
        this.server.use(bodyParser.urlencoded({ extended: false }));
        this.server.use(bodyParser.json());
        this.server.use(cors());
        this.server.set("port", process.env.PORT || this.port || 3000);
    }

    // Configuring routes
    public routes() {
        this.server.use(loginRoute);
        this.server.use(registerUserRoute);
        this.server.use(logoutRoute);
        this.server.use(productRoute);
        this.server.use(addProductRoute);
    }

    // Starting server when called
    public listen() {
        this.server.listen(this.server.get("port"), () => console.log(`Port ${this.server.get("port")} running...`));
    }
}