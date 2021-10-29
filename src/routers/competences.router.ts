import express from "express";
import { check } from "express-validator";


import { deleteOneCompetence, updateOneCompetence } from '../controllers/competences.controllers';
import { tokenValidation } from  "../middlewares/validateToken";
import { validateInfo } from "../middlewares/validateData";


import {
    getCompetences,
    getCompetencesByArea,
    createOneCompetence,

} from "../controllers/competences.controllers";
import { existCompetenceByName } from "../helpers/competenceValidation";


const Router = express.Router();

Router.get("/search", getCompetences);

Router.get("/searcharea", getCompetencesByArea);

Router.post("/area", createOneCompetence);

Router.delete('/delete/:competenceName', [
    check("competenceName").custom(existCompetenceByName),
    validateInfo
    ],
    deleteOneCompetence);


// Router.delete('del/:competenceName/:id', deleteCompetenceFromProfile)

Router.put('/update/:competenceName',updateOneCompetence)


export default Router;