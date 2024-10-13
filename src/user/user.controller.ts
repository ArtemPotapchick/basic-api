import {NextFunction, Request, Response} from "express";

import {BaseController} from "../common/base.controller";
import {TsLoggerService} from "../common/ts-logger.service";
import {UserService} from "./user.service";

export class UserController extends BaseController {
    private userService: UserService;

    constructor(logger: TsLoggerService) {
        super(logger);
        this.userService = new UserService();
        this.bindRoutes([
            {path:'/',method:'get', handler:this.getUsers},
            {path:'/:id',method:'get', handler:this.getUserById},
            {path:'/',method:'post', handler:this.addUser},
            {path:'/:id',method:'patch', handler:this.updateUser},
            {path:'/:id',method:'delete', handler:this.deleteUser},
        ])

    }

    public getUsers(req: Request, res: Response) {
            const users = this.userService.findAll();
            this.ok(res,users);

    }

    public getUserById(req: Request, res: Response) {
            const user = this.userService.findById(req.params?.id);
            this.ok(res,user);

    }

    public addUser(req: Request, res: Response, next: NextFunction) {
            const newUser = this.userService.add(req?.body?.name);
            this.created(res,newUser)
    }

    public updateUser(req: Request, res: Response, next: NextFunction) {
            const updatedUser = this.userService.update(req.params?.id, req?.body?.name);
            this.ok(res,updatedUser);
    }

    public deleteUser(req: Request, res: Response, next: NextFunction) {
            this.userService.delete(req.params.id);
            res.status(204).end();
    }

}