import mysql2 from "mysql2";
import dotenv from "dotenv";
import winston from "winston";
import { UserInfo } from "./user/user_types";

export class DBAgent
{
  private static _instance: DBAgent;
  private _db: mysql2.Connection;
  private _logger: winston.Logger;

  private constructor()
  {
    this._logger = winston.createLogger({
      transports: [
        new winston.transports.Console()
      ]
    });
    dotenv.config({ path: "./src/.env"});
    this._db = mysql2.createConnection({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE
    });
    this._db.connect((error) => {
      console.log("connecting to db...");
      if(error) {
        console.log(error);
      } else {
        console.log("MySQL connected!");
      }
    });
  }

  public static get Instance()
  {
    return this._instance || (this._instance = new this());
  }

  public get db()
  {
    return this._db;
  }

  INSERT_USER(userInfo: UserInfo, callback?: (e: mysql2.QueryError, r: mysql2.ResultSetHeader) => void) : void {
    callback = callback ?? function (err) { this._logger.error(err); };
    this._db.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [userInfo.name, userInfo.email, userInfo.password],
      callback
    );
  }
}