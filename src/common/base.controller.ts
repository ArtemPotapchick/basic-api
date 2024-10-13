import {TsLoggerService} from "./ts-logger.service";
import {Response, Router} from "express";
import {IControllerRoute} from "./route.interface";

export abstract class BaseController {
    private logger: TsLoggerService
    private _router: Router;

    constructor(logger: TsLoggerService) {
        this.logger = logger
        this._router = Router();
    }

    get router() {
        return this._router;
    }

    bindRoutes(routes: IControllerRoute[]) {
        for (const route of routes) {
            const handler = route.handler.bind(this);
            this.router[route.method](route.path, handler);
            this.logger.log(route.method.toUpperCase(), route.path, "binded");
        }
    }


    public created<T>(res: Response, message: T) {
        res.status(201).send(message)
    }

    public send<T>(res: Response, status: number, message: T) {
        res.type("application/json");
        res.status(status).send(message);
    }

    public ok<T>(res: Response, message: T) {
        this.send(res, 200, message)
    }
}