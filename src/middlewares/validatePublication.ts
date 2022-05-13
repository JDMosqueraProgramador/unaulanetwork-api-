import { checkSchema, Result, ValidationError, validationResult } from 'express-validator';
import { NextFunction, Request, Response} from 'express';
import User from '../models/users.models';
import { isValidObjectId } from 'mongoose';

const validateSchemaPublication:any = [
    checkSchema({
        user:{
            isMongoId:{
                errorMessage:"El ID del usuario es inválido."
            }
        },
        description:{
            isLength:{
                errorMessage: "La descripción debe tener al menos x caracteres.",
                options:{min:5}
            }
        },
        visibility:{
           isIn:{
               options:['public', 'private'],
               errorMessage:"La visibilidad ingresada NO es válida"
           }
        },
        group:{
          //Falta grupos
        },
        category:{
            //falta categoría
        },
        reactions:{
            isArray:{
                errorMessage:"El tipo de dato NO es un arreglo"
            }
        },
        comments:{
            isArray:{
                errorMessage:"El tipo de dato NO es un arreglo"
            }
        },
        hashtags:{
            isArray:{
                errorMessage:"El tipo de dato NO es un arreglo"
            }
        },
        
        
    }),
    (req:Request, res:Response, next:NextFunction) =>{
        const results = validationResult.withDefaults({});
        if(!results(req).isEmpty()){
        
           res.status(400).json(results(req).array())

        }else{
            next();
        }
    }
]

export default validateSchemaPublication;