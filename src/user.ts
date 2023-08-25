import bcrypt from "bcryptjs";
import { DBAgent } from "./dbAgent";
import { RegisterUserRequest } from "./types/user_types";

export function RegisterUser (req, res) {
  const requestBody: RegisterUserRequest = req.body;
  const dbAgent = DBAgent.Instance;
  const db = dbAgent.db;
  db.execute("SELECT * FROM `users` where `name` = ?", [requestBody.name], (err, results) => {
    if (err) {
      res.body = err;
      res.send();
    }
    if ((results as Array<any>).length == 1) {
      res.body = "Username taken.";
      res.statusCode = 200;
    }
    else {
      dbAgent.INSERT_USER({
        name: requestBody.name,
        email: requestBody.email,
        password: requestBody.password
      });
    }
    res.send();
  });
}