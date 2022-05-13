import express, { Request, Response, Router } from "express";
const AuthorisationRouter = express.Router();
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
const auth = require("../middleware/requireAuth");
require("lodash");
const { verifyToken } = require("../middleware/requireAuth");
const prisma = new PrismaClient();

// Register New User
AuthorisationRouter.post("/register", async (req, res) => {
  const encryptedPassword = await bcrypt.hash(req.body.password, 5);

  const newUser = await prisma.user.create({
    data: {
      ...req.body,
      password: encryptedPassword,
    },
  });

  res.send(newUser);
});

//log in user
AuthorisationRouter.post("/login", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
      rejectOnNotFound: true,
    });
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isValidPassword) {
      res.status(400).send();
      return;
    }
    // add .env secret key enabled
    const token = jwt.sign(user.id, "tree");

    res.send({ token, user });
  } catch (error) {
    res.status(404).send("error logging in user");
  }
});

AuthorisationRouter.get("/admin", verifyToken, async (req, res, next) => {
  console.log("you have a token");
});

export default AuthorisationRouter;
