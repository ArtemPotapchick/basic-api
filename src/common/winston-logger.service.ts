import winston, {format, transports} from 'winston';
import {ILogger} from "./logger.interface";

export class WinstonLoggerService implements ILogger {
    private logger;

    constructor() {
        this.logger = winston.createLogger({
            level: "info",
            format: format.combine(
                format.timestamp(),
                format.errors({stack: true}),
                format.simple()
            ),
            transports: [
                new transports.File({filename: "error.log", level: "error"}),
                new transports.File({filename: "combined.log"}),
            ],
        });
    }

    log(...args: unknown[]): void {
        this.logger.info(args);
    }

    warn(...args: unknown[]): void {
        this.logger.warn(args);
    }

    error(...args: unknown[]): void {
        this.logger.error(args);
    }
}