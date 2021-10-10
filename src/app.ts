import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";

import userRouter from "./routers/users.router";
import competencesRouter from "./routers/competences.router";
import followRouter from "./routers/follow.router";

const app: Application = express();

app.set("PORT", 4000);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/users", userRouter);
app.use("/competences",competencesRouter);

app.use("/follow", followRouter);


export default app;


