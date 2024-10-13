import {App} from "./app";
import {TsLoggerService} from "./common/ts-logger.service";
import {UserController} from "./user/user.controller";
import {WinstonLoggerService} from "./common/winston-logger.service";

async function bootstrap() {
    const logger = new TsLoggerService();
    const errorLogger = new WinstonLoggerService();
    const app = new App(logger, new UserController(logger), errorLogger);
    await app.init()
}

bootstrap();