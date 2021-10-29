import { Request, Response, NextFunction, request, response } from 'express';
const { body, checkSchema, validationResult } = require("express-validator");
import Competence from '../models/competences.models';
import { existCompetenceByName } from '../helpers/competenceValidation';


export const competenceSchemaValidator = checkSchema({
    name: {
        custom: {
            options: async (value:any) => {
                
                const comp = await Competence.findOne({ name: value });
                //console.log(comp)
                
                if(comp){
                    
                }
               
            },
        },
    },
    description: {
        custom: {
            options: async (value: any) => {
                try {
                    console.log(value.length);
                } catch (error) {
                    throw new Error(
                        "No has ingresado correctamente la descripción de la competencia."
                    );
                }
            },
        },
    },
    area: {
        custom: {
            options: async (value: any) => {
                try {
                   const areas =['informatica','derecho','contaduria','industrial','idiomas','educacion','']
                    if(!areas.includes(value)){
                        throw new Error ("El area introducida NO pertenece a las que tenemos");
                    }
                    
                } catch (error) {
                    throw new Error(
                        "No has ingresado correctamente el área de la competencia."
                    );
                }
            },
        },
    },
    
});