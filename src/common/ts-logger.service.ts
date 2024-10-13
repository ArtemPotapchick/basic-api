import {Logger} from "tslog";
import {ILogger} from "./logger.interface";

export class TsLoggerService implements ILogger {
    private logger

    constructor() {
        this.logger = new Logger();
    }

    log(...args: unknown[]): void {
        this.logger.info(...args);
    }

    warn(...args: unknown[]): void {
        this.logger.warn(...args);
    }

    error(...args: unknown[]): void {
        this.logger.error(...args);
    }
}