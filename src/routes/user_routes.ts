import * as u from "../user/user_controller";
import { UserSchema, RegisterUserSchema } from "../user/user_validation";
import express from "express";
import multer from "multer";
import { ValidationError } from "../types/common";

const upload = multer();
const userRoutes = express.Router();

userRoutes.post("", upload.none(), async (req, res, next) => {
  try {
    RegisterUserSchema.parse(req.body); 
  } catch (error) {
    const err = error as ValidationError;
    err.code = 400;
    next(err);
    return;
  }
  await u.registerUser(req, res);
  next();
});
userRoutes.get("", async (req, res, next) => {
  try {
    UserSchema.parse(req.query); 
  } catch (error) {
    const err = error as ValidationError;
    err.code = 400;
    next(err);
    return;
  }
  await u.loginUser(req, res);
  next();
});
userRoutes.delete("", async (req, res, next) => {
  try {
    UserSchema.parse(req.query); 
  } catch (error) {
    const err = error as ValidationError;
    err.code = 400;
    next(err);
    return;
  }
  await u.deleteUser(req, res);
  next();
});

export { userRoutes };