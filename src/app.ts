import express from "express";
import * as user from "./user";
import bodyParser from "body-parser";
import multer from "multer";
import { logger } from "./logger";
const upload = multer();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", upload.none(), async (req, res) => {
  try {
    await user.RegisterUser(req, res);
  } catch (e) {
    logger.error(e);
    res.statusMessage = e;
    res.status(500);
  }
  res.send();
});

app.get("/login", async (req, res) => {
  try {
    await user.LoginUser(req, res);
  } catch (e) {
    logger.error(e);
    res.status(500);
  }
  res.send();
});

app.listen(port, "localhost", () => {
  logger.info(`Express is listening at http://localhost:${port}`);
});