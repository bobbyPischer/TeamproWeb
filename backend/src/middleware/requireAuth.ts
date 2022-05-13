import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

module.exports = {
  verifyToken: async (req: Request, res: Response) => {
    const header = req.get("Authorisation");
    if (!header) return;
    const token = header.split(" ")[1];
    const id = jwt.decode(token) as string;
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    res.send(user);
  },
};
