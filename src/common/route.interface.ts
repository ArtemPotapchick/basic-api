import {Request, Response, NextFunction, Router} from "express";

export interface IControllerRoute {
    path: string;
    method: keyof Pick<Router, 'get' | 'patch' | 'post' | 'delete'>
    handler: (req: Request, res: Response, next: NextFunction) => void
}