import {Request, Response, NextFunction} from 'express';
import {TsLoggerService} from "../common/ts-logger.service";

const loggingMiddleware = (loggerService: TsLoggerService ) => {
    return (req: Request, res: Response, next: NextFunction) => {
        loggerService.log(`Request: ${req.method} ${req.url} at ${new Date().toISOString()}`);
        next();
    };
};
export default loggingMiddleware ;