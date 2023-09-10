import express from "express";
import bodyParser from "body-parser";
import { logger } from "./logger";
import { router } from "./routes/common";
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(router);

app.listen(port, "localhost", () => {
  logger.info(`Express is listening at http://localhost:${port}`);
});