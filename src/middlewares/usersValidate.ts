import mongoose from 'mongoose';
const {body, checkSchema, validationResult} = require('express-validator');
import User from '../models/users.models';
import { Request, Response} from 'express';
import { validate } from 'uuid';


const userSchemaValidator = checkSchema({
        username:{
            custom : {
                options: async(value:any) =>{

                    const user = await User.findOne({"username": value})
        
                    if(user!=null){
                        //console.log("Acá se verificó que NO se creó")
                        throw new Error('Este username está ocupado');

                    }
                }
            },   
        },
        dayOfBirth :{
            custom:{
                options: async(value:any)=>{
                    
                
                     const birth = value;
                     const validate = new Date((birth)).getFullYear();
                     const dateToday = new Date().getFullYear() - validate;
                    
                     if (dateToday <= 14) {

                         throw new Error('Fecha inválida');

                     }
                }
            }
        },
        /*description:{
            isLength:{
                options:{min:12,max:100},
                errorMessage:"La descripción debe tener una logintud entre 12 y 100 caracteres."
            }
        }*/

    })


export default userSchemaValidator;