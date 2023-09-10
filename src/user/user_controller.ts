import { logger } from "../logger";
import { LoginUserRequest, RegisterUserRequest } from "./user_types";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function registerUser (req, res) {
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

function badLogin (user: LoginUserRequest, res) : void {
  logger.info(`Failed login: ${user.name}`);
  res.statusCode = 401;
  res.statusMessage = "Bad username or password.";
}

export async function loginUser (req, res) : Promise<void> {
  const query: LoginUserRequest = req.query;
  const user = await prisma.users.findFirst({
    where: {
      name: query.name
    }
  });
  if (!user) {
    badLogin(user, res);
    return;
  }
  await bcrypt.compare(query.password, user.password).then( result => {
    if (!result) badLogin(user, res);
    return;
  });
}

export async function deleteUser (req, res) : Promise<void> {
  const query: LoginUserRequest = req.query;
  const user = await prisma.users.findFirst({
    where: {
      name: query.name,
    }
  });
  if (!user) {
    badLogin(user, res);
    return;
  }
  await bcrypt.compare(query.password, user.password).then ( result => {
    if (!result) badLogin(user, res);
    return;
  });
  await prisma.users.delete({
    where: {
      ID: user.ID
    }
  });
}