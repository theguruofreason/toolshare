import { Http2ServerRequest, Http2ServerResponse } from "http2";
import bcrypt from "bcryptjs";
import { DBAgent } from "./dbAgent";
import { RegisterUserRequest } from "./types/user_types"

export function RegisterUser (req, res) {
  const requestBody: RegisterUserRequest = req.body;
  DBAgent.Instance.query
});