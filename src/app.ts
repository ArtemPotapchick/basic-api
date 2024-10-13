import {Server} from "node:http";
import express, {Express} from 'express';

import {TsLoggerService} from "./common/ts-logger.service";
import {UserController} from "./user/user.controller";
import {WinstonLoggerService} from "./common/winston-logger.service";
import {errorHandler, loggingMiddleware} from "./middlewares";


export class App {
    private readonly port: number;
    private app: Express;
    private server?: Server;
    private  logger: TsLoggerService
    private  errorLogger: WinstonLoggerService;
    private userController: UserController;


    constructor(logger:TsLoggerService, userController: UserController, errorLogger: WinstonLoggerService) {
        this.port = 5444;
        this.app = express();
        this.logger = logger;
        this.errorLogger = errorLogger;
        this.userController = userController;


    }

    private setupMiddleware(): void {
        this.app.use(express.json());
        this.app.use(loggingMiddleware(this.logger));
    }

   private useRoutes(){
        this.app.use('/users', this.userController.router);
    }

    private useErrorHandler() {
        this.app.use(errorHandler(this.errorLogger));
    }

    public async init() {
        this.setupMiddleware()
        this.useRoutes()
        this.useErrorHandler()

        this.server = this.app.listen(this.port);
        this.logger.log("Server is running at http://localhost:" + this.port);
    }
}