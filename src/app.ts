import express from "express";
import * as reg from "./user";
import winston from "winston";

const app = express();
const port = 3000;
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console()
  ]
});

app.use(express.urlencoded({extended: false}));
app.use(express.json);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/register", (req, res) => {

});

app.get("/login", (req, res) => {

});

app.listen(port, () => {
  return logger.info(`Express is listening at http://localhost:${port}`);
});