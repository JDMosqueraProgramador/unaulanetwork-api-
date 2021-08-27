import express from "express";

import {
    getCompetences,
    getCompetencesByArea,
    createOneCompetence,

} from "../controllers/competences.controllers";



const Router = express.Router();

Router.get("/search", getCompetences)
Router.get("/searcharea", getCompetencesByArea);

Router.post('/area', createOneCompetence)

export default Router;