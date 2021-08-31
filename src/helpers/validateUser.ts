import { Request, Response} from 'express';
import { isNamedExportBindings } from 'typescript';
import User from '../models/users.models';

export const validationUser = async(req: Request, res: Response, next: any) => {
    
    const user = req.body.username;

    await User.findOne({ username: user }), (err: any) => {
            
        if(user) return res.status(404).json({error: 'Usuario registrado'})
        
    }
        
    next();

}

export const existUserById = async (username:any) => {
    
    const existUser = await User.findOne({username})
    
    if (!existUser) {
        throw new Error('Usuario no encontrado')
    }

}

export const validateDate = async (dayOfBirth:any) => {

    const birth = await User.findOne({dayOfBirth});
    const validate = new Date(birth).getFullYear() - new Date ().getFullYear();


    if(validate >= 15){
       throw new Error('Fecha invalida');
    }
}

/*export const validateDate = async (req: Request, res: Response, next: any) => {

    const {dayOfBirth} = req.body;
    const validate = new Date(dayOfBirth).getFullYear() - new Date ().getFullYear();

    if(validate >= 15){
       next();
    }
    else
    {
        res.status(400).json({error: 'Fecha invalida'});
    }
 
}*/

