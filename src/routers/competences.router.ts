import express from "express";
import { getCompetences } from '../controllers/competences.controllers';

const Router = express.Router();

Router.get("/search", getCompetences)

export default Router;