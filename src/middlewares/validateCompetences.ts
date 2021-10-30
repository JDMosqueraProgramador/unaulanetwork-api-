const { body, checkSchema, validationResult } = require("express-validator");
import Competence from '../models/competences.models';
import { existCompetenceByName } from '../helpers/competenceValidation';
import { NextFunction, Request, Response, request, response } from 'express';
import { validate } from 'uuid';


const competenceSchemaValidator = [
    checkSchema({
        name: {
             isLength: {
                 errorMessage: "El nombre debe tener al menos x numero de carcteres",
                 options: { min: 7 },
             },
           
        },
        area:{
            custom:{
                options: async(value:any)=>{
                    let areas = ['informatica','derecho','contaduria','industrial','idiomas','educacion','']
                    if(!areas.includes(value)){
                        throw new Error("El área NO es de las especificadas.")
                    }
                }
            }
        }
    }),
    (req: Request, res: Response, next:any) => {
        //console.log(validationResult(req).errors);
        if (validationResult(req).errors.length > 0){

            res.status(400).json(validationResult(req).errors)
        } else{
            next();
        }
    }
];

export default competenceSchemaValidator;