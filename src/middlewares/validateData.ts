import { validationResult } from "express-validator";
import { Request, Response } from 'express';


export const validateInfo = (req:Request,res:Response,next : any) => {
    
    const errors = validationResult(req);
   
    if (!errors.isEmpty()) {

        return res.status(400).json(errors);
        
    } else {
        
        next();
        
    }
    
}