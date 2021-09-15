import { Request, Response, NextFunction} from 'express';
import jsontoken from "jsonwebtoken";


export const tokenValidation = (req: Request, res: Response, next: NextFunction) => {

    const token=req.header('auth-token');

    if(!token) return res.status(401).json('Acceso denegado');

    const payLoad = jsontoken.verify(token,process.env.SECRET || 'TokenTest')

    console.log(payLoad);

    next();
}
