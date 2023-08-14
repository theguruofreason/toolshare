import express from "express";
import { RegisterUser } from "../user";

const router = express.Router();

router.post("/register", (req, res) => {
  return RegisterUser(req, res);
});