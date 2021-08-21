import express from "express";
import {
    getCompetences,
    createOneCompetence,
} from "../controllers/competences.controllers";

const Router = express.Router();

Router.get("/:area", getCompetences)

Router.post('/area', createOneCompetence)

export default Router;