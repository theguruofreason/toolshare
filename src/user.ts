import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { LoginUserRequest, RegisterUserRequest } from "./types/user_types";
import { logger } from "./logger";

const prisma = new PrismaClient();

export async function RegisterUser (req, res) {
  const requestBody: RegisterUserRequest = req.body;
  const existingUser = await prisma.users.findFirst({
    where: {
      name: requestBody.name,
    }
  });
  if (existingUser) {
    res.statusCode = 409;
    res.statusMessage = "Username already registered.";
    return;
  } else {
    await bcrypt.hash(requestBody.password, 10).then(async pass => {
      await prisma.users.create({
        data: {
          name: requestBody.name,
          email: requestBody.email,
          password: pass
        }
      });
    });
    res.statusCode = 200;
  }
}

export async function LoginUser (req, res) {
  function badLogin () {
    logger.info(`Failed login: ${user.name}`);
    res.statusCode = 401;
    res.statusMessage = "Bad username or password.";
  }
  const query: LoginUserRequest = req.query;
  const user = await prisma.users.findFirst({
    where: {
      name: query.name
    }
  });
  if (!user) badLogin();
  await bcrypt.compare(query.password, user.password).then( result => {
    if (!result) badLogin();
  });
}