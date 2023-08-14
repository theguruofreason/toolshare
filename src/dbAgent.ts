import mysql2 from "mysql2";
import dotenv from "dotenv";
import winston from "winston";
import { UserInfo } from "./types/user_types";

export class DBAgent
{
  private static _instance: DBAgent;
  private static _db: mysql2.Connection;
  private static _logger: winston.Logger;

  private constructor()
  {
    DBAgent._logger = winston.createLogger({
      transports: [
        new winston.transports.Console()
      ]
    });
    dotenv.config({ path: "./src/.env"});
    DBAgent._db = mysql2.createConnection({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE
    });
    DBAgent._db.connect((error) => {
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

  INSERT_USER(table: string, userInfo: UserInfo) : boolean {
    DBAgent._db.execute(
      "INSERT INTO `table`"
    )
    return true;
  }
}