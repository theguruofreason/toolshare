import express, { Request, Response } from "express";
import { userRoutes } from "./user_routes";
import { logger } from "../logger";
import { Error } from "../types/common";

const router = express.Router();

router.all("/", (req, res) => {
  res.send("Hello, World!");
});

// routes
router.use("/user", userRoutes);

// Error catcher
router.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (err: Error, req: Request, res: Response, next: () => void) => {
    if (err) {
      logger.error(err);
      res.statusCode = err.code;
      res.send(err);
    }
    next();
  }
);

// finally
router.use(
  (_, res) => {
    res.send();
  }
);

export { router };