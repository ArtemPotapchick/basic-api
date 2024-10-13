import {NextFunction, Request, Response} from 'express';
import {WinstonLoggerService} from "../common/winston-logger.service";


const errorHandler = (logger: WinstonLoggerService) => {
    return (err: Error, req: Request, res: Response, next: NextFunction) => {
        const statusCodeDictionary: Record<number, string> = {
            400: "Bad Request",
            401: "unAuthorized",
            403: 'Forbidden',
            404: 'Not Found',
            500: "Something went wrong",

        }

        const status = JSON.parse(err.message) || 500;

        logger.error(status, req.method.toUpperCase(), req.url, new Date());
        const message = statusCodeDictionary[status] || statusCodeDictionary[500];
        res.status(status).send({message});
    }
}
export default errorHandler;