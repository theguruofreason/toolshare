import express from "express";
import * as user from "./user";
import winston from "winston";
import bodyParser from "body-parser";
import multer from "multer";
const upload = multer();

const app = express();
const port = 3000;
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console()
  ]
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", upload.none(), (req, res) => {
  return user.RegisterUser(req, res);
});

app.post("/login", (req, res) => {
  return res;
});

app.listen(port, "localhost", () => {
  logger.info(`Express is listening at http://localhost:${port}`);
});