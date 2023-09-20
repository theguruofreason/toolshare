import * as u from "../user/user_controller";
import { UserSchema, RegisterUserSchema } from "../user/user_validation";
import express from "express";
import multer from "multer";
import { tryParse } from "./util";

const upload = multer();
const userRoutes = express.Router();

userRoutes.post("", upload.none(), async (req, res, next) => {
  const parsedRequest = tryParse(req.body, RegisterUserSchema, next);
  if (!parsedRequest.success) return;
  await u.registerUser(parsedRequest.data, res);
  next();
});
userRoutes.get("", async (req, res, next) => {
  const parsedRequest = tryParse(req.body, UserSchema, next);
  if (!parsedRequest.success) return;
  await u.loginUser(parsedRequest.data, res);
  next();
});
userRoutes.delete("", async (req, res, next) => {
  const parsedRequest = tryParse(req.body, UserSchema, next);
  if (!parsedRequest.success) return;
  await u.deleteUser(parsedRequest.body, res);
  next();
});

export { userRoutes };