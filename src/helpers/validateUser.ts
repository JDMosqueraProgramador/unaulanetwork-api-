import { Request, Response} from 'express';
import { isNamedExportBindings } from 'typescript';
import User from '../models/users.models';
import { setUsers } from '../controllers/users.controllers';

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

export const validateDate = async (dayOfBirth: any) => {

    
    const birth = dayOfBirth;
    const validate = new Date((birth)).getFullYear();
    const dateToday = new Date().getFullYear() - validate;

    if(dateToday <= 14 ){
        
       throw new Error ('Fecha invalida');

    }
    
}
