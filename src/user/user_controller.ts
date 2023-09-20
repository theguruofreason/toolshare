import { logger } from "../logger";
import { LoginUserRequest, RegisterUserRequest } from "./user_types";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export async function registerUser (req: RegisterUserRequest, res: Response) {
  const existingUser = await prisma.users.findFirst({
    where: {
      OR: [
        { name: req.name },
        { email: req.email}
      ]
    }
  });
  if (existingUser) {
    res.statusCode = 409;
    res.statusMessage = "Username or email already registered.";
    return;
  } else {
    await bcrypt.hash(req.password, 10).then(async pass => {
      await prisma.users.create({
        data: {
          name: req.name,
          email: req.email,
          password: pass
        }
      });
    });
    res.statusCode = 200;
  }
}

function badLoginCredentials (user: LoginUserRequest | RegisterUserRequest, res: Response) : void {
  logger.info(`Failed login: ${user.name}:${user.password}`);
  res.statusCode = 401;
  res.statusMessage = "Bad username or password.";
}

export async function loginUser (req: Request, res: Response) : Promise<void> {
  const query: LoginUserRequest = req.query as LoginUserRequest;
  const user = await prisma.users.findFirst({
    where: {
      name: query.name
    }
  });
  if (!user) {
    badLoginCredentials(query, res);
    return;
  }
  await bcrypt.compare(query.password, user.password).then( result => {
    if (!result) badLoginCredentials(user, res);
    return;
  });
}

export async function deleteUser (req: Request, res: Response) : Promise<void> {
  const query: LoginUserRequest = req.query as LoginUserRequest;
  const user = await prisma.users.findFirst({
    where: {
      name: query.name,
    }
  });
  if (!user) {
    badLoginCredentials(query, res);
    return;
  }
  await bcrypt.compare(query.password, user.password).then ( result => {
    if (!result) badLoginCredentials(user, res);
    return;
  });
  await prisma.users.delete({
    where: {
      ID: user.ID
    }
  });
}