import * as u from "../user/user_controller";
import express from "express";
import multer from "multer";

const upload = multer();
const userRoutes = express.Router();

userRoutes.post("", upload.none(), async (req, res, next) => {
  await u.registerUser(req, res);
  next();
});
userRoutes.get("", async (req, res, next) => {
  await u.loginUser(req, res);
  next();
});
userRoutes.delete("", async (req, res, next) => {
  await u.deleteUser(req, res);
  next();
});

export { userRoutes };