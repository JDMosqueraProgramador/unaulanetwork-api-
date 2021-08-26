import { Request, Response } from 'express';
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
        throw new Error('usuario no encontrado')
    }

}
