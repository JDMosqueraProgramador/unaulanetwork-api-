import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";

import proyectsRouter from "./routers/proyects.router"

import userRouter from "./routers/users.router";
import competencesRouter from "./routers/competences.router";
import followRouter from "./routers/follow.router";
import publicationsRouter from "./routers/publications.router"

const app: Application = express();

app.set("PORT", 4000);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/users", userRouter);
app.use("/competences",competencesRouter);

app.use("/follow", followRouter);

app.use("/proyects", proyectsRouter);
app.use("/publications", publicationsRouter )

export default app;


