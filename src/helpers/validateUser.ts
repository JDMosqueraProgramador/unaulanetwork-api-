import User from "../models/users.models";
import { Request, Response} from 'express';
import { isNamedExportBindings } from 'typescript';
import { setUsers } from '../controllers/users.controllers';


export const validationUser = async (username : any) => {

    const user = checkEmail(username);


     const usuario = await User.findOne({ username: user })
        
    
    if (usuario) {
        throw new Error("Usuario registrado");
    }
    
};


//Le extraemos el correo al username esto del correo
export const checkEmail =  (username: string) => {
    
    
    if (username.includes('@')) {

        const charToDel: number = username.length - 14;

        let userName = username.substr(0, charToDel);

        const user = userName;

        return user;
    }

    return username;

};




export const existUserById = async (username:any) => {
    
    const existUser = await User.findOne({username})

    if (!existUser) {
        throw new Error('Usuario no encontrado')
    }

}



export const validateDate = async (dayOfBirth: any) => {

    // export const validateDate =async  (dayOfBirth: any) => {


    //     const birth = dayOfBirth;
    //     const validate = new Date((birth)).getFullYear();
    //     const dateToday = new Date().getFullYear() - validate;

    //     if(dateToday <= 14 ){
        
    //        throw new Error ('Fecha invalida');

    //     }
    
    // }
}
