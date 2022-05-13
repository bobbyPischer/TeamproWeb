import express from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const app = express();
app.use(express.json());
const port = 3000;
import cors from "cors";
app.use(cors({ origin: true }));

import users from "./routes/Users";
import auth from "./routes/Authorisation";

app.use("/users", users);
app.use("/auth", auth);

app.listen(port, () => {
  console.log(`server started on ${port}`);
});
