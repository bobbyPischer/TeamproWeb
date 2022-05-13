import express, { Request, Response, Router } from "express";
const UserRouter = express.Router();
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const verify = require("../middleware/requireAuth");

// create new user

UserRouter.post("/", async (req, res) => {
  const data = req.body;

  const newUser = await prisma.user.create({ data });

  console.log(newUser);
  res.send(newUser);
});

//get users

UserRouter.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.send(users);
});

export default UserRouter;
