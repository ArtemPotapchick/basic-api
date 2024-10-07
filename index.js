import express from "express";
import logger from "./middlewares/logger.js";
import userRouter from "./router/user.routes.js";
import errorHandler from "./middlewares/errorHandler.js";

const port = 5444;
const app = express();


app.use(logger);

app.use(express.json());

app.use(userRouter);

app.use(errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));