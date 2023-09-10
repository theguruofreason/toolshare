import express from "express";
import { userRoutes } from "./user_routes";
import { logger } from "../logger";

const router = express.Router();

router.all("/", (req, res) => {
  res.send("Hello, World!");
});

// Error Bubbler
router.use(
  (_, __, next) => {
    try {
      next();
    } catch (error) {
      logger.error(error);
    }
  }
);

// routes
router.use("/user", userRoutes);

// finally
router.use(
  (_, res) => {
    res.send();
  }
);

export { router };