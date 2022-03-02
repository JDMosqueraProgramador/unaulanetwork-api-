import Publication from "../models/publications.models";
import { Request, Response } from "express";


export const createPublication = async(req:Request, res:Response) =>{
    
    console.log(req.body)
    
    res.status(200)
    
    // const data = {
    //     user: req.body.id,
    //     description: req.body.description,

    // }
}